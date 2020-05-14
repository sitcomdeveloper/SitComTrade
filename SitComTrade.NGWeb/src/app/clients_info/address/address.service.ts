import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }
  getAddress(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetAddressByOwnerId/' + obj, {});
  }
  insertAddress(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/InsertUpdateAddress', obj);
  }
}
