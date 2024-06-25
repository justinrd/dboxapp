import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskCancelPage } from './task-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: TaskCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskCancelPageRoutingModule {}
