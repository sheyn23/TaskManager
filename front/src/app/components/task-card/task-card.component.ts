import { Component, Input, OnInit } from '@angular/core';
import { DtoTask } from 'src/app/share/models/DtoTask';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {

  @Input() task!: DtoTask;

  constructor() { }

  ngOnInit(): void {
  }

}
