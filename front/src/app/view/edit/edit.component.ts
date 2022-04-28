import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { DtoTask } from 'src/app/share/models/DtoTask';
import { TaskManagerResponse } from 'src/app/share/models/TaskManagerResponse';
import { DataService } from 'src/app/share/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

  private newTask = false;
  private taskId!: Guid;
  private taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.createFilterForm()
  }

  ngOnInit(): void {
    let taskId = this.route.snapshot.params['id'];
    console.log(this.route);

    this.getTask(taskId);
  }

  private getTask(id: Guid) {
    this.dataService.getTask(id)
      .subscribe((response: TaskManagerResponse<DtoTask>) => {
        if (!!response) {
          this.taskForm.patchValue(response.data);
        } else {
          alert("Ошибка выполнения запроса");
        }
      }, (error: { message: string }) => {
        alert(error.message);
      });
  }

  private createFilterForm(): FormGroup {
    return this.fb.group({
      sortedBy: new FormControl(),
    })
  }
}
