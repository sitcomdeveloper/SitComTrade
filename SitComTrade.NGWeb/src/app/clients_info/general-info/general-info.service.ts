import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

const API_URL=environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {
  userInfoForm:FormGroup;

  constructor(private http:HttpClient) { }
  getUsersInfo(): Observable<any>{
    return this.http.get<any>(API_URL + "Client/GetClientDetailById/3");
  }
  countryName(obj: any): Observable<any>{
    return this.http.post<any>(API_URL + 'User/GetAllCountries', obj);
  }
}
