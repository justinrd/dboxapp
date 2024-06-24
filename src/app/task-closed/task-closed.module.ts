import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskClosedPageRoutingModule } from './task-closed-routing.module';

import { TaskClosedPage } from './task-closed.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskClosedPageRoutingModule
  ],
  declarations: [TaskClosedPage]
})
export class TaskClosedPageModule {}
