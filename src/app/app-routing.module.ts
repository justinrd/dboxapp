import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'task-open',
    loadChildren: () => import('./task-open/task-open.module').then( m => m.TaskOpenPageModule)
  },
  {
    path: 'task-detail/:id',
    loadChildren: () => import('./task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
  },
  {
    path: 'task-signature/:id',
    loadChildren: () => import('./task-signature/task-signature.module').then( m => m.TaskSignaturePageModule)
  },
  {
    path: 'task-cancel/:id',
    loadChildren: () => import('./task-cancel/task-cancel.module').then( m => m.TaskCancelPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
