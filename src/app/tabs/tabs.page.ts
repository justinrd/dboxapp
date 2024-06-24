import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  result: any = [];

  private storage: Storage = new Storage();

  constructor(private apiService: ApiService, private toastController: ToastController, private router: Router) {}
  
  async ngOnInit() {
    await this.storage.create();
    const sessionData = await this.storage.get('token');

    if(sessionData == null){
      this.router.navigate(['login']);
    }
  }

  async logout(){
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

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

}
