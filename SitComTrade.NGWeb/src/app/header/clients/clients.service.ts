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
    return this.http.post<any>(API_URL + 'Client/GetAllClientsByOwnerId/' + obj, {});
  }
  // tradeaccount.componet.ts
  getTradeUsers(obj): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetTradeAccountByType', obj);
  }
  // get all trade accounts
  getallTradeAccounts(alltrdeaccnts: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeAccount/GetAllTradeAccounts', alltrdeaccnts);
  }
  // trade account details by id
  getTradeAccountdetailsbyId(Id: any): Observable<any> {
    return this.http.post<any>(API_URL + "TradeAccount/GetTradeAccountDetailById/" + Id, {});
  }
  // update trade account 
  updtTradeAccount(modifyTradeAccount: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeAccount/UpdateTradeAccount', modifyTradeAccount);
  }
  // item.componet.ts
  addnewClients(obj): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/AddClient', obj);
  }
  // client.componet.ts
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
  // send mail to selected
  sndmailtoselected(selectsentmail: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/EmailToSelectedClients',selectsentmail);
  }
   // get all columns header for import client
  importClientByExcel(colmnsHeader: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetColumnHeader', colmnsHeader);
  }
  // return back file
  sendExcelBack(filename: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/ImportClient/' + filename, {});
  }
  // send sms to all
  sendsmstoall(sndsmsall: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/SendMessageToAllClients', sndsmsall);
  }
  // send sms to selected
  sendsmstoselctd(sndsmstoSelected: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/SendMessageToSelectedClients',sndsmstoSelected);
  }
}
