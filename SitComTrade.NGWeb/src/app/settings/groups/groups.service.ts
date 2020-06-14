import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }
  // get all trade groups
  getTradeGroups(obj: any): Observable<any> {
   return this.http.post<any>(API_URL + 'TradeGroup/GetAllTradeGroups', obj);
  }
  // add new group
  addTradeGroups(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeGroup/InsertTradeGroup', obj);
  }
  // get group details on general info section
  getGroupDetails(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeGroup/GetTradeGroupDetailById/' + obj, {});
  }
  // update trade group
  updateGroup(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeGroup/UpdateTradeGroup', obj);
  }
  getAllLverages(): Observable<any> {
    return this.http.get<any>(API_URL + 'TradeGroup/GetAllLeverageList');
  }
  deleteGroups(dltgrps: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeGroup/DeleteMultipleTradeGroup',dltgrps);
  }
}
