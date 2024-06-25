import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-task-cancel',
  templateUrl: './task-cancel.page.html',
  styleUrls: ['./task-cancel.page.scss'],
})
export class TaskCancelPage implements OnInit {

  public motiveCancel: string = "";
  
  private storage:Storage = new Storage();

  private id: any = null;
  private result: any = [];
  

  constructor(private route: ActivatedRoute, private apiService: ApiService, private toastController: ToastController, private router: Router) { }

  async ngOnInit() {
    await this.storage.create();

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }

  async saveCancel() {
    const sessionData = await this.storage.get('token');
    this.apiService.get('AddNotes', 'token='+sessionData['token'] + '&task_id=' + this.id + '&notes=' + this.motiveCancel).subscribe({
      next: data => {
        this.changeStatus();
        this.router.navigate(['/tabs'])
        .then(() => {
          window.location.reload();
        });
      }, error:_err => {
        this.presentToast('No pudimos procesar los datos en este momento, intenta más tarde');
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

  async logout() {
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeDutyStatus', 'token=' + sessionData['token']).subscribe({
      next: data => {
        this.storage.clear();
        this.router.navigate(['login']);
      }, error: err => {
        this.presentToast('Ocurrió un error al cerrar tu sesión');
      }
    })
  }

  async changeStatus() {
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeTaskStatus', 'token=' + sessionData['token'] + '&task_id=' + this.id + '&status_raw=cancelled').subscribe({
      next: data => {
        this.result = data;
      }, error: _err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
      }
    })
  }

}
