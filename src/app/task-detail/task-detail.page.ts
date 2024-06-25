import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private toastController: ToastController, private router: Router) { }

  private storage: Storage = new Storage();

  private id: any = null;
  private result: any = [];

  public task: any = [];
  public taskStatus: string = '';

  public photos: any = [];

  async ngOnInit() {
    await this.storage.create();

    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });

    this.getDetail(this.id);

    this.getPhotos(this.id);

  }

  async getDetail(id: string) {
    const sessionData = await this.storage.get('token');
    this.apiService.get('TaskDetails', 'token=' + sessionData['token'] + '&task_id=' + id).subscribe({
      next: data => {
        this.result = data;
        this.task = this.result['details'];
        this.taskStatus = this.task['status_raw'];
      }, error: _err => {
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

  back() {
    this.router.navigate(['/tabs']);
  }

  async changeStatus($event: any) {
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeTaskStatus', 'token=' + sessionData['token'] + '&task_id=' + this.id + '&status_raw=' + $event).subscribe({
      next: data => {
        this.result = data;
      }, error: _err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
      }
    })
  }

  async complete() {
    this.router.navigate(['task-signature/' + this.id]);
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

  async addNewToGallery() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 75
    });

    const blobImg = this.dataURItoBlob('data:image/png;base64,' + photo.base64String);
    const formData: FormData = new FormData();
    formData.append('file', blobImg, (Math.random() * 100000000000000000).toString() + '_image');

    const sessionData = await this.storage.get('token');
    this.apiService.postPhoto('UploadTaskPhoto', formData, 'token=' + sessionData['token'] + '&task_id=' + this.id).subscribe({
      next: data => {
        this.getPhotosAfterLoad();
      },
      error: err => {
        this.presentToast('Ocurrió un error al intentar cargar la foto, intenta más tarde');
      }
    })
  }

  async openGallery() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos,
      quality: 75
    });

    const blobImg = this.dataURItoBlob('data:image/png;base64,' + photo.base64String);
    const formData: FormData = new FormData();
    formData.append('file', blobImg, (Math.random() * 100000000000000000).toString() + '_image');

    const sessionData = await this.storage.get('token');
    this.apiService.postPhoto('UploadTaskPhoto', formData, 'token=' + sessionData['token'] + '&task_id=' + this.id).subscribe({
      next: data => {
        this.getPhotosAfterLoad();
      },
      error: err => {
        this.presentToast('Ocurrió un error al intentar cargar la foto, intenta más tarde');
      }
    })
  }


  dataURItoBlob(dataURI: any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString: any;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
      byteString = atob(dataURI.split(',')[1]);
    } else {
      byteString = unescape(dataURI.split(',')[1]);
    }

    // separate out the mime component
    const mimeString = dataURI
      .split(',')[0]
      .split(':')[1]
      .split(';')[0];
    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  }

  async getPhotos(id: string) {
    const sessionData = await this.storage.get('token');
    this.apiService.get('GetTaskPhoto', 'token=' + sessionData['token'] + '&task_id=' + id).subscribe({
      next: data => {
        this.result = data;
        this.photos = this.result['details'];
      }, error: _err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
      }
    })
  }

  async getPhotosAfterLoad() {
    const sessionData = await this.storage.get('token');
    this.apiService.get('GetTaskPhoto', 'token=' + sessionData['token'] + '&task_id=' + this.id).subscribe({
      next: data => {
        this.result = data;
        this.photos = this.result['details'];
      }, error: _err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
      }
    })
  }

  call() {
    window.open('tel:' + this.task['contact_number']);
  }

  localize() {
    window.open('https://maps.google.com/?q=' + this.task.delivery_address);
  }

  async decline() {
    const sessionData = await this.storage.get('token');
    this.apiService.get('ChangeTaskStatus', 'token='+sessionData['token'] + '&task_id=' + this.id + '&status_raw=cancelled').subscribe({
      next: data => {
        this.result = data;
        this.router.navigate(['tabs']);
      }, error:_err => {
        this.presentToast('No pudimos obtener los datos en este momento, intenta más tarde');
      }
    })
  }


  cancel(){
    this.router.navigate(['task-cancel/' + this.id]);
  }
}
