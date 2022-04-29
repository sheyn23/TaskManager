import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
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

  resultMessage = '';
  taskForm!: FormGroup;
  private newTask = false;
  private navigationSubscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private fb: FormBuilder,
    private location: Location
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

  saveTask() {
    this.newTask ? this.addTask() : this.updateTask();
  }

  goBack() {
    this.location.back();
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
      id: new FormControl(),
      name: new FormControl('asdsad'),
      priority: new FormControl(''),
      marks: new FormControl(),
      description: new FormControl(''),
    })
  }

  private updateTask() {
    this.dataService.update({
      ...this.taskForm.getRawValue(),
      marks: JSON.stringify(this.taskForm.getRawValue().marks)
    }).subscribe((response: TaskManagerResponse<DtoTask>) => {
      if (!!response) {
        if (response.status) {
          this.resultMessage = "Задача успешно обновлена!"
        } else {
          this.resultMessage = "Ошибка выполнения запроса..."
        }
      } else {
        this.resultMessage = "Ошибка выполнения запроса..."
      }
    }, (error: { message: string }) => {
      this.resultMessage = ""
      alert(error.message);
    });
  }

  private addTask() {
    this.dataService.add({
      ...this.taskForm.getRawValue(),
      marks: JSON.stringify(this.taskForm.getRawValue().marks)
    }).subscribe((response: TaskManagerResponse<DtoTask>) => {
      if (!!response) {
        if (response.status) {
          this.router.navigate([`/task/${response.data.id}`])
        } else {
          this.resultMessage = "Ошибка выполнения запроса..."
        }
      } else {
        this.resultMessage = "Ошибка выполнения запроса..."
      }
    }, (error: { message: string }) => {
      this.resultMessage = ""
      alert(error.message);
    });
  }
}
