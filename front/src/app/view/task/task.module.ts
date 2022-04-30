import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskComponent } from '@view/task/task.component';
import { TaskRoutingModule } from '@view/task/task-routing.module';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TaskRoutingModule
  ],
  exports: [
    TaskComponent
  ],
})
export class TaskModule { }
