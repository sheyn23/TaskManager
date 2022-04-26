import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  filterForm!: FormGroup;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.createFilterForm();
  }

  ngOnInit(): void {
    this.getTasks();

    this.filterForm.valueChanges.subscribe(() => {
      this.tasks = [];
      this.getTasks()
    });
  }

  private createFilterForm(): FormGroup {
    return this.fb.group({
      sortedBy: new FormControl('asc'),
      marks: new FormControl([]),
      priority: new FormControl([]),
    })
  }

  private getTasks() {
    this.dataService.getTasks({
      ...this.filterForm.getRawValue(),
      start: this.tasks.length,
      count: 15
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
