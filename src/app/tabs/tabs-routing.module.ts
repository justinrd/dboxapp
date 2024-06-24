import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'task-open',
        loadChildren: () => import('../task-open/task-open.module').then(m => m.TaskOpenPageModule)
      },
      {
        path: 'task-closed',
        loadChildren: () => import('../task-closed/task-closed.module').then(m => m.TaskClosedPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/task-open',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/task-open',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
