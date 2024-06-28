import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-open',
  templateUrl: './task-open.page.html',
  styleUrls: ['./task-open.page.scss'],
})
export class TaskOpenPage implements OnInit {

  public now:Date = new Date();
  public isActive: boolean = false;

  private storage: Storage = new Storage();
  private result: any = [];

  public tasks: any = [];

  constructor(private router: Router, private apiService: ApiService, private toastController: ToastController) { }

  async ngOnInit() {
    this.tasks = [];
    
    await this.storage.create();

    const sessionData = await this.storage.get('token');

    if(sessionData == null){
      this.router.navigate(['login']);
      return;
    }
    
    if(sessionData['duty_status'] == 1){
      this.isActive = true;
    }

    await this.loadTasks()
  }

  async openDetail(id: string){
    this.router.navigate(['task-detail/' + id]);
  }

  async changeStatus(){
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeDutyStatus', 'token=' + sessionData['token']).subscribe({
      next: data => {
        this.result = data;

        if(this.result['msg'] == "OK"){
          this.isActive = false;

        }

      }, error: err => {
        this.presentToast('Ocurrió un error al actualizar el estado');
      }
    })
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  async loadTasks(){
    const sessionData = await this.storage.get('token');
    this.apiService.get('GetTaskByDate', 'token=' + sessionData['token']).subscribe({
      next: data => {
        this.result = data;
        this.tasks = this.result['details'];
      }, error: err => {
        this.presentToast('Ocurrió un error al intentar obtener las tareas');
      }
    })
  }


  async changeStatusTask(id: string, raw: string) {

    if(raw == 'assigned'){
      const element = this.tasks.find(
        (el: any) => el.status_raw === "inprogress"
      );

      if(element != null){
        await this.presentToast('Debes completar la tarea que ya has iniciado');
        return;
      }
    }

    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeTaskStatus', 'token=' + sessionData['token'] + '&task_id=' + id + '&status_raw=inprogress').subscribe({
      next: data => {
        this.result = data;
        this.tasks = [];
        this.loadTasks();
      }, error: _err => {
        this.presentToast('No pudimos procesar los datos en este momento, intenta más tarde');
      }
    })
  }

  searchTasksByCustomerName(tasks: any[], searchTerm: string): Array<any> {
    // Handle case-insensitive search
    const searchTermLower = searchTerm.toLowerCase();
  
    return tasks.filter((task) => {
      const customerNameLower = task.customer_name.toLowerCase();
      // Check for partial matches using includes()
      return customerNameLower.includes(searchTermLower);
    });
  }

  async searchByText(event: any){

    if(event.detail.value == ''){
      await this.loadTasks();
    }else{
      this.tasks = this.searchTasksByCustomerName(this.tasks, event.detail.value);
    }
  }

}
