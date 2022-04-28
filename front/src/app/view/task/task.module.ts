import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TaskComponent
  ],
})
export class TaskModule { }
