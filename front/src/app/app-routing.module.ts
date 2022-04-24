import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './view/edit/edit.component';
import { ErrorPageComponent } from './view/error-page/error-page.component';
import { ManagerComponent } from './view/manager/manager.component';
import { TaskComponent } from './view/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: '/manager', pathMatch: 'full' },
  { path: 'manager', component: ManagerComponent, loadChildren: () => import('./view/manager/manager.module').then(m => m.ManagerModule) },
  { path: 'edit/{id}', component: EditComponent },
  { path: 'task/{id}', component: TaskComponent },
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
