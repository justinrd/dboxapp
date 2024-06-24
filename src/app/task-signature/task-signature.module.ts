import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskSignaturePageRoutingModule } from './task-signature-routing.module';

import { TaskSignaturePage } from './task-signature.page';

import SignaturePad from 'signature_pad';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskSignaturePageRoutingModule
  ],
  declarations: [TaskSignaturePage]
})
export class TaskSignaturePageModule {}
