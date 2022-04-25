import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { DataService } from 'src/app/share/services/data.service';

@NgModule({
  declarations: [
    TaskComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    TaskComponent
  ],
})
export class TaskModule { }
