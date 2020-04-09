import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL=environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class MarketingInfoService {

  constructor(private http:HttpClient) { }
  // getMarketingInfo(): Observable<any>{
  //   return this.http.get<any>(API_URL + "User/GetMarketingInfoByOwnerId/1");
  // }
}
