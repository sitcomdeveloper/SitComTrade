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
  // crm users.get all crm users
  getAllCrmUsers(users: any): Observable<any> {
    return this.http.post(API_URL + 'User/GetAllUsersByOwnerId/' + users, {});
  }
  // crm users.create user.component.ts
  getAllDepartments(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllDepartments');
  }
   // crm users.create user.component.ts
   getAllDesks(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllDesks');
   }
   // crm users.create user.component.ts
   getAllTimeZones(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllTimeZones');
   }
   // crm users.create user.component.ts
   getAllModules(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllModules');
   }
   // crm users.create user.component.ts
   getAllCultureCodes(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllCultureCodes');
   }
   // crm users.create user.component.ts
   getAllRoles(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllRoles');
   }
   getAllAffiliateFields(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllAffiliateFields');
   }
   getAllSenderSettings(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllSenderSettings');
   }
  //  Registr user
  registeruser(rgstrusr: any): Observable<any> {
    return this.http.post(API_URL + 'User/RegisterUser', rgstrusr);
  }

}
