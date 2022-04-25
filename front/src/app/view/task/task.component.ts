import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DtoTask } from 'src/app/share/models/DtoTask';
import { Guid } from 'guid-typescript';
import { DataService } from 'src/app/share/services/data.service';
import { TaskManagerResponse } from 'src/app/share/models/TaskManagerResponse';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.sass']
})
export class TaskComponent implements OnInit, OnDestroy {

  task!: DtoTask;
  private navigationSubscription;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  initialiseInvites(): void {
    let taskId = this.route.snapshot.params['id'];
    this.getTask(taskId);
  }

  private getTask(id: Guid) {
    this.dataService.getTask(id)
      .subscribe((response: TaskManagerResponse<DtoTask>) => {
        if (!!response) {
          this.task = response.data;
          // if (response["status"] == 0) {
          // } else {
          //   alert(response["errorInfo"]["details"]);
          // }
        } else {
          alert("Ошибка выполнения запроса");
        }
      }, (error: { message: string }) => {
        alert(error.message);
      });
  }

}
