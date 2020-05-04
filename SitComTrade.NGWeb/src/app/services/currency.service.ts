import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }
  currencyName(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'User/GetAllCurrencies', obj);
  }
}
