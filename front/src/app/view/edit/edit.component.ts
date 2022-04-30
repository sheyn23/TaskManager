import { Guid } from 'guid-typescript';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DtoTask } from '@models/DtoTask';
import { TaskManagerResponse } from '@models/TaskManagerResponse';
import { DataService } from '@services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnDestroy {

  resultMessage = '';
  taskForm!: FormGroup;
  private newTask = false;
  private navigationSubscription!: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataService: DataService,
    private readonly fb: FormBuilder,
    private readonly location: Location
  ) {
    this.setNavigationSubscription();
    this.taskForm = this.createTaskForm()
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  saveTask(): void {
    if (this.taskForm.valid) {
      this.newTask ? this.addTask() : this.updateTask();
    }
  }

  goBack(): void {
    this.location.back();
  }

  private setNavigationSubscription(): void {
    this.navigationSubscription = this.router.events.subscribe((e: any): void => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  private initialiseInvites(): void {
    let taskId = this.route.snapshot.params['id'];

    if (taskId === undefined) {
      this.newTask = true;
      this.taskForm.reset();
    } else {
      this.newTask = false;
      this.getTask(taskId);
    }
  }

  private getTask(id: Guid): void {
    this.dataService.getTask(id)
      .subscribe((response: TaskManagerResponse<DtoTask>): void => {
        if (!!response) {
          if (response.status) {
            this.taskForm.patchValue(response.data);
          } else {
            alert("Ошибка получения задачи");
          }
        } else {
          alert("Ошибка получения задачи");
        }
      }, (error: { message: string }): void => {
        alert(error.message);
      });
  }

  private createTaskForm(): FormGroup {
    return this.fb.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      marks: new FormControl(),
      description: new FormControl(''),
    })
  }

  private updateTask(): void {
    this.dataService.update({
      ...this.taskForm.getRawValue(),
      marks: JSON.stringify(this.taskForm.getRawValue().marks)
    }).subscribe((response: TaskManagerResponse<DtoTask>): void => {
      if (!!response) {
        if (response.status) {
          this.resultMessage = "Задача успешно обновлена!"
        } else {
          this.resultMessage = ""
          alert("Ошибка обновления задачи")
        }
      } else {
        this.resultMessage = ""
        alert("Ошибка обновления задачи")
      }
    }, (error: { message: string }): void => {
      this.resultMessage = ""
      alert(error.message);
    });
  }

  private addTask(): void {
    this.dataService.add({
      ...this.taskForm.getRawValue(),
      marks: JSON.stringify(this.taskForm.getRawValue().marks)
    }).subscribe((response: TaskManagerResponse<DtoTask>): void => {
      if (!!response) {
        if (response.status) {
          this.router.navigate([`/task/${response.data.id}`])
        } else {
          this.resultMessage = "",
            alert("Ошибка добавления задачи")
        }
      } else {
        this.resultMessage = ""
        alert("Ошибка добавления задачи")
      }
    }, (error: { message: string }): void => {
      this.resultMessage = ""
      alert(error.message);
    });
  }

  get name() { return this.taskForm.get('name'); }

  get priority() { return this.taskForm.get('priority'); }
}
