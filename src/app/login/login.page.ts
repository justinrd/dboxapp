import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Network } from '@capacitor/network';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public form = {userName : '', password : ''};
  public tryLogin: boolean = false;
  private storage: Storage = new Storage();
  public loginError: boolean = false;
  public loginErrorMessage: string = "";


  constructor(private apiService: ApiService, private router: Router, private loadingCtrl: LoadingController, private alertController: AlertController, private jwtHelper: JwtHelperService) { }

  async ngOnInit() {
    await this.storage.create();

    const sessionData = await this.storage.get('token');

    if(sessionData != null){
      this.router.navigate(['tabs']);
    }
  }

async login(){

  const loading = await this.loadingCtrl.create({
    message: 'Validando tu cuenta',
  });

  loading.present();

  this.apiService.post<any>("login", 'username=' + this.form.userName + "&password=" + this.form.password)
  .subscribe({
    next: (res) => {
      if(res["code"] == 1){
        this.router.navigate(['tabs']);
        this.storage.set('token', res['details'])
        this.storage.set('duty_status', res['details']['duty_status']);
      }else{
        this.loginError = true;
        this.loginErrorMessage = "Credenciales incorrectas";
      }
    },
    error: (err) => {
      console.log(err);
      this.loginErrorMessage = "Error interno del servidor";
    }
  })
  loading.dismiss();
}

async storeToken(token: string, username: string) {
  await this.storage.create();
  await this.storage.set('token', token);
  await this.storage.set('username', username);
}

async validateToken() {
  try {
    const token = await this.storage.get('token');
    if(token){
      const decodedToken = this.jwtHelper.decodeToken(token);
      const expirationDate = decodedToken["exp"];
      return expirationDate >= Date.now() / 1000;
    }
    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
      return false;
  }
}

async networkValidation(){
  // const status = await Network.getStatus();
  return status;
}

}
