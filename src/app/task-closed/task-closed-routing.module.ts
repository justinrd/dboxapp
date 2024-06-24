import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskClosedPage } from './task-closed.page';

const routes: Routes = [
  {
    path: '',
    component: TaskClosedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskClosedPageRoutingModule {}
