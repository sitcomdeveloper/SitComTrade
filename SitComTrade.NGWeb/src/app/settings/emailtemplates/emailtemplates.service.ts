import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class EmailtemplatesService {

  constructor(private http: HttpClient) { }
  // get all templates
  getTemplates(): Observable<any> {
    return this.http.get('assets/emailtemplates.json');
  }
}
