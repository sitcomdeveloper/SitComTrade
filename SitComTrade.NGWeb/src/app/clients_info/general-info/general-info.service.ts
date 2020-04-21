import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {
  constructor(private http: HttpClient) { }
  getUsersInfo(): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetClientDetailById/3');
  }
  getRegistrationType(): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetRegistrationTypeEnum');
  }
}
