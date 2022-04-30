import { Observable, Subject } from 'rxjs';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DtoTask } from '@models/DtoTask';
import { TaskManagerResponse } from '@models/TaskManagerResponse';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {

  tasks: DtoTask[] = [];
  filterForm!: FormGroup;
  private fetching = false;

  constructor(
    private readonly dataService: DataService,
    private readonly fb: FormBuilder
  ) {
    this.filterForm = this.createFilterForm();
  }

  ngOnInit(): void {
    this.getTasks();
    this.setFilterFormChangeSubscribtion();
  }

  private setFilterFormChangeSubscribtion(): void {
    this.filterForm.valueChanges.subscribe(() => {
      this.tasks = [];
      this.fetching = false;
      this.getTasks();
    });
  }

  private createFilterForm(): FormGroup {
    return this.fb.group({
      sortedBy: new FormControl('desc'),
      marks: new FormArray([]),
      priority: new FormArray([]),
    })
  }

  private getTasks(): Observable<DtoTask[]> {
    let subject = new Subject<DtoTask[]>();

    this.dataService.getTasks({
      ...this.filterForm.getRawValue(),
      start: this.tasks.length,
      count: 15
    }).subscribe((response: TaskManagerResponse<DtoTask[]>): void => {
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

  onCheckChange(event: any, checkGroup: string): void {
    const formArray: FormArray = this.filterForm.get(checkGroup) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
    else {
      let i: number = 0;
      formArray.controls.forEach((el: any): void => {
        if (el.value == event.target.value) {
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll(): void {
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight && !this.fetching) {
      this.fetching = true;
      this.getTasks().subscribe((result: DtoTask[]) => {
        if (result.length > 0) {
          this.fetching = false;
        }
      })
    }
  }

}

