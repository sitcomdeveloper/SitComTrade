import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class TasksInfoService {

  constructor(private http: HttpClient) { }
  insertTask(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Task/InsertTask', obj);
  }
  getTaskType(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Task/GetTaskTypes', obj);
  }
  getTaskStatus(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Task/GetAllTaskStatus', obj);
  }
}
