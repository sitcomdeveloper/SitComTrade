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
  getUsersInfo(obj: any): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetClientDetailById/' + obj);
  }
  getRegistrationType(): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetRegistrationTypeEnum');
  }
  // update client details
  updateClient(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/UpdateClient', obj);
  }
  // get all status
  getStatus(): Observable<any> {
    return this.http.get<any>(API_URL + 'Common/GetAllLeadStatus');
  }
  // actions service.
  // send email
  sendmail(email: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/CreateEmail', email);
  }
  // get all mails
  getMail(mail: any): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetEmailByOwnerId/' + mail);
  }
  // get registration history
  getregHistory(reghis: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetClientInfoDetailById/' + reghis, {});
  }
  // get view history
  getviewhistory(vwhis: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Common/GetAllHistory/' + vwhis, {});
  }
  // send sms
  sendsms(sms: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/SendShortMessage', sms);
  }
  // convert lead to real. create trade(real) account
  crttradeacc(convertingtrdeAcc: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeAccount/CreateTradeAccount', convertingtrdeAcc);
  }
  // financial transactions API
  // get transaction type
  gettransactiontype(): Observable<any> {
    return this.http.get<any>(API_URL + 'TradeAccount/GetTransactionTypeEnum');
  }
// get transaction approval
gettransactionapproval(): Observable<any> {
  return this.http.get<any>(API_URL + 'TradeAccount/GetTransactionTypeEnum');
}
// insert financial transaction
insrtfinancialTrnsion(insrtfincilTransParamtr: any):  Observable<any> {
  return this.http.post<any>(API_URL + 'TradeAccount/AddFinancialTransaction', insrtfincilTransParamtr);
}
// update financial transaction
updtfinancialTrnsion(updtfincilTransParamtr: any):  Observable<any> {
  return this.http.post<any>(API_URL + 'TradeAccount/UpdateFinancialTransaction', updtfincilTransParamtr);
}
// financil transaction by id
getfinanciltransbyId(finTransId: any): Observable<any> {
  return this.http.post<any>(API_URL + 'TradeAccount/GetFinancialTransactionById/' + finTransId, {});
}
}
