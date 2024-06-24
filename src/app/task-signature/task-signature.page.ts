import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SignaturePad from 'signature_pad';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-task-signature',
  templateUrl: './task-signature.page.html',
  styleUrls: ['./task-signature.page.scss'],
})
export class TaskSignaturePage implements OnInit {

  private storage: Storage = new Storage();
  private id: any = null;
  private result: any = null;

  private signUser: string = "";

  constructor(private router: Router, private apiService: ApiService, private route: ActivatedRoute, private toastController: ToastController) { }

  @ViewChild("canvas", { static: true }) canvas!: ElementRef;
  sig!: SignaturePad;

  async ngOnInit() {
    await this.storage.create();
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.sig = new SignaturePad(this.canvas.nativeElement);
  }

  clear() {
    this.sig.clear();
  }

  back(){

  }

  cancel(){
    this.router.navigate(['tabs']);
  }


  async complete(){
    const sessionData = await this.storage.get('token');
    this.signUser = this.sig.toDataURL();
    this.apiService.get('AddSignatureToTask', 'token=' + sessionData['token'] + '&task_id=' + this.id + '&image=' + this.signUser).subscribe({
      next: data => {
        console.log(data);
        this.changeStatus();
        this.router.navigate(['/tabs']);
      }, error: err => {
        console.log(err);
      }
    })
  }

  async changeStatus(){
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeTaskStatus', 'token='+sessionData['token'] + '&task_id=' + this.id + '&status_raw=successful').subscribe({
      next: data => {
        this.result = data;
      }, error:_err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
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
}
