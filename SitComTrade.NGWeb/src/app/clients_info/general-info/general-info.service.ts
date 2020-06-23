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
}
