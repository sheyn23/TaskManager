import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [
    TaskCardComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ManagerComponent
  ],
})
export class ManagerModule { }
