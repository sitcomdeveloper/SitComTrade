import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workflows, InstrumentsDTO } from './settingsDTO';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  // sendersettings
  // getSenderSettings(): Observable<any> {
  //   return this.http.get('assets/sendersettings.json');
  // }
  // crm users.get all crm users
  getAllCrmUsers(users: any): Observable<any> {
    return this.http.post(API_URL + 'User/GetAllUsersByOwnerId/' + users, {});
  }
   // affilate users.Get all affilate users
   getAffilateUsers(afilteusers: any): Observable<any> {
    return this.http.post(API_URL + 'User/GetAllUsersByOwnerId/' + afilteusers, {});
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
    // return this.http.get(API_URL + 'Common/GetAllTimeZones');
    return this.http.get('http://testmode.aptimyst.com/interview/public/sub-category/get');
   }
   // crm users.create user.component.ts
   getAllModules(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllModules');
   }
   getAllModulesGroups(): Observable<any> {
    return this.http.get(API_URL + 'Common/GetAllModuleGroups');
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
  //  crmnewuser.Registr user
  registeruser(rgstrusr: any): Observable<any> {
    return this.http.post(API_URL + 'User/RegisterUser', rgstrusr);
  }
  // crmedituser.save details of user after patch
updateUser(updt: any): Observable<any> {
  return this.http.post(API_URL + 'User/UpdateUserDetail', updt);
}
// affilate user.create affilate user
registeraffilateuser(rgstrafflteuser: any): Observable<any> {
  return this.http.post(API_URL + 'User/RegisterUser', rgstrafflteuser);
}
// usersettings.get login user details
getUserDetails(gtusrdtls: any): Observable<any> {
  return this.http.post(API_URL + 'User/GetUserById/' + gtusrdtls, {});
}
// instruments. Get all instruments
getInstruments(gtintrumnts: InstrumentsDTO): Observable<InstrumentsDTO[]> {
  return this.http.post<InstrumentsDTO[]>(API_URL + 'Instrument/GetAllInstruments' , gtintrumnts);
}
// dlt instruments
dltInstruments(dltmiltipleInstruments: InstrumentsDTO): Observable<InstrumentsDTO> {
  return this.http.post<InstrumentsDTO>(API_URL + 'Instrument/DeleteMultipleInstrument', dltmiltipleInstruments)
}
// crt Instruments
crtInstruments(addInstruments: InstrumentsDTO): Observable<InstrumentsDTO> {
  return this.http.post<InstrumentsDTO>(API_URL + 'Instrument/InsertInstrument', addInstruments);
}
// edt instruements
edtInstruments(updtInstruments: InstrumentsDTO): Observable<InstrumentsDTO> {
  return this.http.post<InstrumentsDTO>(API_URL + 'Instrument/UpdateInstrument', updtInstruments);
}
// get instruments by id
getintrumentsId(Id: number): Observable<any> {
  return this.http.post<any>(API_URL + 'Instrument/GetInstrumentDetailById/' + Id, {});
}
// workflows. Get all workflows
getWorkflows(gtwrkflws: Workflows): Observable<Workflows> {
  return this.http.post<Workflows>(API_URL + 'WorkFlow/GetAllWorkFlows', gtwrkflws);
}
dlttWorkflows(clrworkflow: Workflows): Observable<Workflows> {
  return this.http.post<Workflows>(API_URL + 'WorkFlow/DeleteWorkFlowById/' + clrworkflow, {});
}
// create workflow
crtWorkflow(addwrkflw: Workflows): Observable<Workflows> {
  return this.http.post<Workflows>(API_URL + 'WorkFlow/InsertWorkFlow', addwrkflw);
}
// edt workflow
edtWorkflow(updtWorkflw: Workflows): Observable<Workflows> {
  return this.http.post<Workflows>(API_URL + 'WorkFlow/UpdateWorkFlow', updtWorkflw);
}
}
