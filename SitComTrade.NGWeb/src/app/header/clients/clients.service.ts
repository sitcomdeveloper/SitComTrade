import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private http: HttpClient) { }
  getUsers(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + "user/GetAllUsersByOwnerId/1", obj);
  }
}
