import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskSignaturePage } from './task-signature.page';

const routes: Routes = [
  {
    path: '',
    component: TaskSignaturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskSignaturePageRoutingModule {}
