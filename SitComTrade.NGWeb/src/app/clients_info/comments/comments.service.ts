import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }
  getComments(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/GetCommentByOwnerId/1', obj);
  }
  insertComments(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/InsertComment', obj);
  }
  deleteAllComment(obj: any): Observable<any> {
    return this.http.post<any>(API_URL + 'Client/DeleteAllComment' , obj);
  }
}
