import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { DtoTask } from 'src/app/share/models/DtoTask';
import { TaskManagerResponse } from 'src/app/share/models/TaskManagerResponse';
import { DataService } from 'src/app/share/services/data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit, OnDestroy {

  taskForm!: FormGroup;
  private newTask = false;
  private taskId!: Guid;
  private navigationSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    this.taskForm = this.createTaskForm()
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initialiseInvites(): void {
    let taskId = this.route.snapshot.params['id'];
    console.log(taskId);

    if (taskId === undefined) {
      this.newTask = true;
      this.taskForm.reset();
    } else {
      this.newTask = false;
      this.getTask(taskId);
    }

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

  private createTaskForm(): FormGroup {
    return this.fb.group({
      name: new FormControl('asdsad'),
      priority: new FormControl(''),
      marks: new FormArray([]),
      description: new FormControl(''),
    })
  }

  saveTask() {
    this.newTask ? this.addTask() : this.updateTask();
  }

  private updateTask() {
    this.dataService.update({ ...this.taskForm.getRawValue() }).subscribe((response: TaskManagerResponse<DtoTask>) => {
      if (!!response) {
        console.log('updated');

      } else {
        alert("Ошибка выполнения запроса");
      }
    }, (error: { message: string }) => {
      alert(error.message);
    });
  }

  private addTask() {
    this.dataService.add({
      ...this.taskForm.getRawValue(),
      marks: JSON.stringify(this.taskForm.getRawValue().marks)
    }).subscribe((response: TaskManagerResponse<DtoTask>) => {
      if (!!response) {
        console.log('add');
      } else {
        alert("Ошибка выполнения запроса");
      }
    }, (error: { message: string }) => {
      alert(error.message);
    });
  }
}
