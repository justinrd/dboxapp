import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskCancelPageRoutingModule } from './task-cancel-routing.module';

import { TaskCancelPage } from './task-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskCancelPageRoutingModule
  ],
  declarations: [TaskCancelPage]
})
export class TaskCancelPageModule {}
