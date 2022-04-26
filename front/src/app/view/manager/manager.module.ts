import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TaskCardComponent } from 'src/app/components/task-card/task-card.component';
import { ManagerComponent } from './manager.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeStatusPipe } from 'src/app/share/pipes/time-status.pipe';

@NgModule({
  declarations: [
    TaskCardComponent,
    ManagerComponent,
    TimeStatusPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    ManagerComponent
  ],
  providers: [
    DatePipe
  ]
})
export class ManagerModule { }
