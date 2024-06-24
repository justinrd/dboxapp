import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskOpenPage } from './task-open.page';

const routes: Routes = [
  {
    path: '',
    component: TaskOpenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskOpenPageRoutingModule {}
