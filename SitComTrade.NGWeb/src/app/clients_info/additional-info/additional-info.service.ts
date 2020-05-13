import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AdditionalInfoService {

  constructor(private http: HttpClient) { }
  getAdditionalInfo(additionalinfoObj: any): Observable<any> {
    return this.http.get<any>(API_URL + 'Client/GetAdditionalInfoByOwnerId/' + additionalinfoObj);
  }
  // insert-update
  insertAdditionalInfo(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/InsertUpdateAdditionalInfo', obj);
  }
}
