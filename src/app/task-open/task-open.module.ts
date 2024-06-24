import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskOpenPageRoutingModule } from './task-open-routing.module';

import { TaskOpenPage } from './task-open.page';

@NgModule({
    declarations: [TaskOpenPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TaskOpenPageRoutingModule
    ]
})
export class TaskOpenPageModule {}
