import { Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoTask } from '@models/DtoTask';
import { DtoRequestTask } from '@models/DtoRequestTask';
import { TaskManagerResponse } from '@models/TaskManagerResponse';
import { environment } from 'src/environments/environment'

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

  add(data: DtoTask): Observable<TaskManagerResponse<DtoTask>> {
    return this.http.post<TaskManagerResponse<DtoTask>>(`${environment.apiUrl}/tasks`, data);
  }

  update(data: DtoTask): Observable<TaskManagerResponse<DtoTask>> {
    return this.http.put<TaskManagerResponse<DtoTask>>(`${environment.apiUrl}/tasks/update`, data);
  }

  delete(id: Guid): Observable<TaskManagerResponse<void>> {
    return this.http.delete<TaskManagerResponse<void>>(`${environment.apiUrl}/tasks/${id}`);
  }
}