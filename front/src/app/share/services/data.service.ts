import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'
import { TaskManagerResponse } from '../models/TaskManagerResponse';
import { DtoTask } from '../models/DtoTask';
import { Guid } from 'guid-typescript';
import { DtoRequestTask } from '../models/DtoRequestTask';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  //Task
  getTasks(data: DtoRequestTask): Observable<TaskManagerResponse<DtoTask[]>> {
    return this.http.post<TaskManagerResponse<DtoTask[]>>(`${environment.apiUrl}/get-paginated-tasks`, data);
  }

  getTask(id: Guid): Observable<TaskManagerResponse<DtoTask>> {
    return this.http.get<TaskManagerResponse<DtoTask>>(`${environment.apiUrl}/tasks/${id}`);
  }

  add(data: DtoTask): Observable<TaskManagerResponse<DtoTask[]>> {
    return this.http.post<TaskManagerResponse<DtoTask[]>>(`${environment.apiUrl}/tasks`, data);
  }

  update(data: DtoTask): Observable<TaskManagerResponse<DtoTask>> {
    return this.http.put<TaskManagerResponse<DtoTask>>(`${environment.apiUrl}/tasks/update`, { data: data });
  }

  delete(id: Guid) {
    return this.http.delete(`${environment.apiUrl}/tasks/${id}`);
  }
}