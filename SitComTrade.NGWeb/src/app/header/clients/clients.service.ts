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
    return this.http.post<any>(API_URL + 'Client/GetAllClientsByOwnerId/1', obj);
  }
  // tradeaccount.componet.ts
  getTradeUsers(obj): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetTradeAccountByType', obj);
  }
  // item.componet.ts
  addnewClients(obj): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/AddClient', obj);
  }
  // client.componet.ts
  // delete client
  // dltClient(obj): Observable<any> {
  //   return this.http.post<any>(API_URL + 'Client/DeleteClient/' + obj , {});
  // }
  // dlt multiple clients
  dltmultipleClient(dmc: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/DeleteMultipleClients',dmc);
  }
  // make the client starred
  clientStarred(mkestarred: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/UpdateClientStarred', mkestarred);
  }
  // sendmailto all
  mailsenttoALLClients(sentall: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/EmailToAllClients', sentall);
  }
  importClient(imprtclnt): Observable<any> {
    
    return this.http.post<any>('http://localhost/shanky/angu_api/user_api.php', imprtclnt);
  }
}
