import { Component, Input } from '@angular/core';
import { DtoTask } from '@models/DtoTask';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent {

  @Input() task!: DtoTask;

  constructor() { }
}
