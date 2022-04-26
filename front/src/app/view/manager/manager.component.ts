import { Component, OnInit } from '@angular/core';
import { DtoTask } from 'src/app/share/models/DtoTask';
import { TaskManagerResponse } from 'src/app/share/models/TaskManagerResponse';
import { DataService } from 'src/app/share/services/data.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {

  tasks: DtoTask[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  private getTasks() {
    this.dataService.getTasks({
      sortedBy: 'asc',
      marks: ['design'],
      priority: ['low', 'high'],
      start: 0,
      count: 10
    }).subscribe((response: TaskManagerResponse<DtoTask[]>) => {
      if (!!response) {
        this.tasks = response.data;
      } else {
        alert("Ошибка выполнения запроса");
      }
    }, (error: { message: string }) => {
      alert(error.message);
    });
  }

}
