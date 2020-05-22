import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  // affilate users.Get all affilate users
  getAffilateUsers(): Observable<any> {
    return this.http.get('assets/affilateusers.json');
  }
  // sendersettings
  getSenderSettings(): Observable<any> {
    return this.http.get('assets/sendersettings.json');
  }
}
