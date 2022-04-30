import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeStatusPipe } from '@pipes/time-status.pipe';
import { ManagerComponent } from '@view/manager/manager.component';
import { TaskCardComponent } from '@components/task-card/task-card.component';

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
