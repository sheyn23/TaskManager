import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from '@view/edit/edit.component';

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
