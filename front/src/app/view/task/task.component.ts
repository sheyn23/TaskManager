import { Subscription } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DtoTask } from '@models/DtoTask';
import { TaskManagerResponse } from '@models/TaskManagerResponse';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnDestroy {

  task!: DtoTask;
  private navigationSubscription!: Subscription;

  constructor(
    private readonly dataService: DataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location
  ) {
    this.setNavigationSubscription();
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  deleteTask(): void {
    this.dataService.delete(this.task.id).subscribe((response: TaskManagerResponse<void>) => {
      if (!!response) {
        if (response.status) {
          this.router.navigate(['/manager'])
        } else {
          alert("Ошибка выполнения запроса")
        }
      } else {
        alert("Ошибка выполнения запроса");
      }
    }, (error: { message: string }): void => {
      alert(error.message);
    });
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
    this.getTask(taskId);
  }

  private getTask(id: Guid): void {
    this.dataService.getTask(id)
      .subscribe((response: TaskManagerResponse<DtoTask>): void => {
        if (!!response) {
          if (response.status) {
            this.task = response.data;
          } else {
            alert("Ошибка выполнения запроса")
          }
        } else {
          alert("Ошибка выполнения запроса");
        }
      }, (error: { message: string }): void => {
        alert(error.message);
      });
  }
}
