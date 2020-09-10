import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  constructor(private http: HttpClient) { }
  // tasks.Delete multiple tasks
  dltTasks(deleteTasks: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Task/DeleteMultipleTasks', deleteTasks);
  }
  // get tasks 
  getTasks(gtalltasks: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Task/GetTaskByOwnerId', gtalltasks);
  }
  // get all monetary transactions(financila transactions)
  getMonetaryTransactions(getmonetrytransactios: any): Observable<any> {
    return this.http.post<any>(API_URL + 'TradeAccount/GetAllFinancialTransactionLists', getmonetrytransactios);
  }
}
