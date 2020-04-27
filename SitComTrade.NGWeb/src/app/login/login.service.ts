import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../src/environments/environment';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  loginUser(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'User/IsAuthenticated', obj);
  }
  saveUserInfo(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'User/RegisterUser', obj);
  }
  countryName(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'User/GetAllCountries', obj);
  }
  currencyName(obj: any): Observable<any> {

    return this.http.post<any>(API_URL + 'User/GetAllCurrencies', obj);
  }
  resetPassword(obj: any): Observable<any> {
    console.log('fgtpassword', obj);
    return this.http.post<any>(API_URL + 'User/ForgotPassword?username=' + obj, {});
    }
}
// kk84singh
