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

  async ionViewWillEnter(){
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

  openDetail(id: string){
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



}
