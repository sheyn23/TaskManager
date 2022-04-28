import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './view/edit/edit.component';
import { ErrorPageComponent } from './view/error-page/error-page.component';
import { ManagerComponent } from './view/manager/manager.component';
import { TaskComponent } from './view/task/task.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/manager', pathMatch: 'full'
  },
  {
    path: 'manager', component: ManagerComponent,
    loadChildren: () => import('./view/manager/manager.module').then(m => m.ManagerModule)
  },
  {
    path: 'edit', component: EditComponent,
    loadChildren: () => import('./view/edit/edit.module').then(m => m.EditModule)
  },
  {
    path: 'task/:id', component: TaskComponent,
    loadChildren: () => import('./view/task/task.module').then(m => m.TaskModule)
  },
  {
    path: '**', component: ErrorPageComponent,
    loadChildren: () => import('./view/error-page/error-page.module').then(m => m.ErrorPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
