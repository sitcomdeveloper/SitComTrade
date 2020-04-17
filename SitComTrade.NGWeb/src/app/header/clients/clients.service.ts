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
  // client.componet.ts
  getUsers(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + "user/GetAllUsersByOwnerId/1", obj);
  }
  // tradeaccount.componet.ts
  getTradeUsers(obj): Observable<any> {
    return this.http.post<any>(API_URL + "User/GetTradeAccountByType", obj);
  }
  // item.componet.ts
  addnewClients(obj): Observable<any> {
    return this.http.post<any>(API_URL + "Client/AddClient", obj);
  }
}
