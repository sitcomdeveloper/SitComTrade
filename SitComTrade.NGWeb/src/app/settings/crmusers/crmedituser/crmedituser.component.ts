import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-crmedituser',
  templateUrl: './crmedituser.component.html',
  styleUrls: ['./crmedituser.component.css']
})
export class CrmedituserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  newRegisterForm: FormGroup;
  Desks: any;
  isshared: any;
  notshared: any;
  Departments: any;
  TimeZones: any;
  CultureCode: any;
  Roles: any;
  SenderSettings: any;
  isharedsender: any;
  notsharedsender: any;
  takewholedata: any;
  savedtls: any;
  response: string;
  getLoginDetails: any;
  bindLoginData: any;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    
    this.newRegisterForm = this.fb.group({
      image: [''],
      firstname: [''],
      lastname: [''],
      username: [''],
      email: [''],
      phone: [''],
      disabled: [''],
      desk: [''],
      roles: [''],
      department: [''],
      shareddesks: [''],
      timezone: [''],
      culturecode: [''],
      uiculturecode: [''],
      startmodule: [''],
      defaultsendersetting: [''],
      sharedsendersettings: [''],
      password: [''],
      repeatpassword: [''],

      deskid: [''],
      rolesid: [''],
      departmentid: [''],
      shareddesksid: [''],
      timezoneid: [''],
      culturecodeid: [''],
      uiculturecodeid: [''],
      startmoduleid: [''],
      defaultsendersettingid: [''],
      sharedsendersettingsid: ['']
    });
    this.getDesks();
    this.getDepartments();
    this.getTimeZone();
    this.getCultureCodes();
    this.getRoles();
    this.getSenderSettings();
    this.patchCrmUsers();
  }
  getDesks() {
    this.settingsService.getAllDesks().subscribe(desks => {
      if (desks !== null && desks !== undefined && desks !== '') {
      this.Desks = desks;
      this.isshared = this.Desks.filter(shareddata => {
        if (shareddata.IsShared === true) {
          return shareddata;
        }
        // console.log('isshared',this.isshared);
      });
      this.notshared = this.Desks.filter(notshareddata => {
        if (notshareddata.IsShared === false) {
          return notshareddata;
        }
        // console.log('notshareddata',this.notshared);
      });
      // console.log('Desks', desks);
    }
    });
  }
  getDepartments() {
    this.settingsService.getAllDepartments().subscribe(departments => {
      this.Departments = departments;
      // console.log('Departments', departments);
    });
  }
  getTimeZone() {
    this.settingsService.getAllTimeZones().subscribe(timezone => {
      this.TimeZones = timezone;
      console.log('TimeZones', timezone);
    });
  }
  getCultureCodes() {
    this.settingsService.getAllCultureCodes().subscribe(cultrecode => {
      this.CultureCode = cultrecode;
      console.log('CultureCode', cultrecode);
    });
  }
  getRoles() {
    this.settingsService.getAllRoles().subscribe(roles => {
      this.Roles = roles;
      console.log('Roles', roles);
    });
  }
  getSenderSettings() {
    this.settingsService.getAllSenderSettings().subscribe(sndrsettings => {
      this.SenderSettings = sndrsettings;
      this.isharedsender = this.SenderSettings.filter( sharedsenderdata => {
        if (sharedsenderdata.IsShared === true) {
          return sharedsenderdata;
        }
      });
      this.notsharedsender = this.SenderSettings.filter(notsharedsenderdata => {
        if (notsharedsenderdata.IsShared === false) {
          return notsharedsenderdata;
        }
      });
      console.log('SenderSettings', sndrsettings);
    });
  }
  // patch value
  patchCrmUsers() {
    this.newRegisterForm.patchValue({
      // image:this.takewholedata.ImageName,
      firstname:this.takewholedata.FirstName,
      lastname:this.takewholedata.LastName,
      username:this.takewholedata.UserName,
      email:this.takewholedata.Email,
      phone:this.takewholedata.Phone,
      disabled:this.takewholedata.IsDisabled,
      desk:this.takewholedata.DeskName,
      roles:this.takewholedata.RoleName,
      department:this.takewholedata.DepartmentName,
      shareddesks:this.takewholedata.SharedDeskName,
      timezone:this.takewholedata.TimezoneName,
      culturecode:this.takewholedata.CultureCode,
      uiculturecode:this.takewholedata.UiCultureCode,
      startmodule:this.takewholedata.StartModuleName,
      defaultsendersetting:this.takewholedata.DefaultSenderName,
      sharedsendersettings:this.takewholedata.SharedSenderName,
    })
  }
  // save details of user after patch
  saveeditinfo() {
    const updt = {
      FirstName: this.newRegisterForm.value.firstname,
      LastName: this.newRegisterForm.value.lastname,
      Email: this.newRegisterForm.value.email,
      Phone: this.newRegisterForm.value.phone,
      Password: this.newRegisterForm.value.password,
      OwnerId: this.bindLoginData.UserId,
      Id: this.takewholedata.Id,
      DeskId: '',
      DeskName: this.newRegisterForm.value.desk,
      IsDisabled: this.newRegisterForm.value.disabled,
      UserName: this.newRegisterForm.value.username,
      IsAffiliateUser: 'true',
      ImageName: this.newRegisterForm.value.image,
      LockoutEnabled: 'true',
      CampaignCode: 'gh',
      AffiliateFieldId: '',
      AffiliateFieldName: 'gh',
      RoleId: '',
      RoleName: this.newRegisterForm.value.roles,
      DepartmentId: '',
      DepartmentName: this.newRegisterForm.value.department,
      SharedDeskId: this.takewholedata.shareddesks,
      SharedDeskName: this.newRegisterForm.value.shareddesksid,
      TimezoneId: '',
      TimezoneName: this.newRegisterForm.value.timezone,
      CultureCode: this.newRegisterForm.value.culturecode,
      CultureCodeId: '',
      UiCultureCode: this.newRegisterForm.value.uiculturecode,
      UiCultureCodeId: '',
      StartModuleId: '5',
      StartModuleName: 'clients',
      DefaultSenderName: this.newRegisterForm.value.defaultsendersetting,
      DefaultSenderId: '',
      SharedSenderName: this.newRegisterForm.value.sharedsendersettings,
      SharedSenderId: '',
    };
this.settingsService.updateUser(updt).subscribe(updateusr => {
  this.savedtls = updateusr;
  this.clddata.emit(updateusr);
      if (updateusr === 'null') {
        this.response = '';
      } else {
        this.response = 'User is updated successfully!';
      }
      this.newRegisterForm.reset();
  console.log('savedtls',updateusr);
})
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
