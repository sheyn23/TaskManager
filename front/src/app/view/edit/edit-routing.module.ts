import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';

console.log('test');

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditComponent
  },
  {
    path: ':id',
    component: EditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
