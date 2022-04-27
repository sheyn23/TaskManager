import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DtoTask } from 'src/app/share/models/DtoTask';
import { TaskManagerResponse } from 'src/app/share/models/TaskManagerResponse';
import { DataService } from 'src/app/share/services/data.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {

  @ViewChild('tasksRef') private tasksRef!: ElementRef;

  tasks: DtoTask[] = [];
  filterForm!: FormGroup;
  private fetching: boolean = false;

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
      sortedBy: new FormControl('desc'),
      marks: new FormArray([]),
      priority: new FormArray([]),
    })
  }

  private getTasks() {
    let subject = new Subject<any>();

    this.dataService.getTasks({
      ...this.filterForm.getRawValue(),
      start: this.tasks.length,
      count: 6
    }).subscribe((response: TaskManagerResponse<DtoTask[]>) => {
      if (!!response) {
        this.tasks.push(...response.data);
        subject.next(response.data);
      } else {
        alert("Ошибка выполнения запроса");
      }
    }, (error: { message: string }) => {
      alert(error.message);
    });

    return subject.asObservable();
  }

  onCheckChange(event: any, checkGroup: string) {
    const formArray: FormArray = this.filterForm.get(checkGroup) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((el: any) => {
        if (el.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
      if (!this.fetching) {
        this.fetching = true;
        this.getTasks().subscribe((result: DtoTask[]) => {
          this.fetching = false;
        })
      }
    }
  }

}

