import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../settings.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crmnewuser',
  templateUrl: './crmnewuser.component.html',
  styleUrls: ['./crmnewuser.component.css']
})
export class CrmnewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  Desks: any;
  Departments: any;
  TimeZones: any;
  CultureCode: any;
  Roles: any;
  SenderSettings: any;
  Modules: any;
  Clients: any;
  Activities: any;
  Settings: any;
  Reports: any;
  newRegisterForm: FormGroup;
  RegisteredUser: any;
  getLoginDetails: any;
  bindLoginData: any;
  ModulesGroups: any;
  mdlen: any;
  isshared: any;
  notshared: any;
  isharedsender: any;
  notsharedsender: any;

  constructor(private bsmodal: BsModalRef, private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    // form group
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
    this.getModules();
    // this.getModulesGroup();
  }
  hideModal() {
    this.bsmodal.hide();
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
  getModules() {
    this.settingsService.getAllModules().subscribe(modules => {
      this.Modules = modules;
      this.Clients = this.Modules.filter(clients => {
        if (clients.ModuleGroupName === 'Clients') {
          return clients;
        }
      });
      this.mdlen = this.Clients.length;
      console.log('clients', this.Clients.length);
      this.Activities = this.Modules.filter(activities => {
        if (activities.ModuleGroupName === 'Activities') {
          return activities;
        }
      });
      this.Reports = this.Modules.filter(reports => {
        if (reports.ModuleGroupName === 'Reports') {
          return reports;
        }
      });
      this.Settings = this.Modules.filter(settings => {
        if (settings.ModuleGroupName === 'Settings') {
          return settings;
        }
      });

      console.log('Modules', modules);
    });

  }
  // make the user registered
  svingDtls() {
    this.notshared.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.desk) {
        this.newRegisterForm.value.deskid = element.Name;
      }
    });
    this.isshared.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.shareddesks) {
        this.newRegisterForm.value.shareddesksid = element.Name;
      }
    });
    this.Roles.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.roles) {
        this.newRegisterForm.value.rolesid = element.Name;
      }
    });
    this.Departments.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.department) {
        this.newRegisterForm.value.departmentid = element.Name;
      }
    });
    this.TimeZones.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.timezone) {
        this.newRegisterForm.value.timezoneid = element.Name;
      }
    });
    this.CultureCode.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.culturecode) {
        this.newRegisterForm.value.culturecodeid = element.Name;
      }
    });
    this.CultureCode.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.uiculturecode) {
        this.newRegisterForm.value.uiculturecodeid = element.Name;
      }
    });
    this.Modules.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.startmodule) {
        this.newRegisterForm.value.startmoduleid = element.Name;
      }
    });
    this.notsharedsender.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.defaultsendersetting) {
        this.newRegisterForm.value.defaultsendersettingid = element.Name;
      }
    });
    this.isharedsender.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.sharedsendersettings) {
        this.newRegisterForm.value.sharedsendersettingsid = element.Name;
      }
    });
    const rgstrusr = {
      FirstName: this.newRegisterForm.value.firstname,
      LastName: this.newRegisterForm.value.lastname,
      Email: this.newRegisterForm.value.email,
      Phone: this.newRegisterForm.value.phone,
      Password: this.newRegisterForm.value.password,
      DeskId: this.newRegisterForm.value.desk,
      DeskName: this.newRegisterForm.value.deskid,
      IsDisabled: this.newRegisterForm.value.disabled,
      UserName: this.newRegisterForm.value.username,
      ImageName: this.newRegisterForm.value.image,
      RoleId: this.newRegisterForm.value.roles,
      RoleName: this.newRegisterForm.value.rolesid,
      DepartmentId: this.newRegisterForm.value.department,
      DepartmentName: this.newRegisterForm.value.departmentid,
      SharedDeskId: this.newRegisterForm.value.shareddesks,
      SharedDeskName: this.newRegisterForm.value.shareddesksid,
      // SharedDeskId: '2',
      // SharedDeskName: 'de',
      // TimezoneId: this.newRegisterForm.value.TimezoneId,
      TimezoneId: '1',
      TimezoneName: this.newRegisterForm.value.timezone,
      // CultureCode: this.newRegisterForm.value.culturecode,
      CultureCode: 'fg',
      // CultureCodeId: this.newRegisterForm.value.culturecodeid,
      CultureCodeId: '1',
      // UiCultureCode: this.newRegisterForm.value.uiculturecode,
      // UiCultureCodeId: this.newRegisterForm.value.uiculturecodeid,
      UiCultureCode: 'f',
      UiCultureCodeId: '1',
      // StartModuleId: this.newRegisterForm.value.startmoduleid,
      // StartModuleName: this.newRegisterForm.value.startmodule,
      StartModuleId: '5',
      StartModuleName: 'clients',
      DefaultSenderId: this.newRegisterForm.value.defaultsendersettingid,
      // DefaultSenderId: '1',
      DefaultSenderName: this.newRegisterForm.value.defaultsendersetting,
      // DefaultSenderName: 'gh',
      SharedSenderId: this.newRegisterForm.value.sharedsendersettingsid,
      // SharedSenderId: '1',
      SharedSenderName: this.newRegisterForm.value.sharedsendersettings,
      // SharedSenderName: 'fg',
      OwnerId: this.bindLoginData.UserId,
      LockoutEnabled: 'true',
      CampaignCode: 'gh',
      AffiliateFieldId: '6',
      AffiliateFieldName: 'gh',
      IsAffiliateUser: 'true'
    };
    this.settingsService.registeruser(rgstrusr).subscribe(user => {
      this.RegisteredUser = user;
      console.log('RegisteredUser', user);
    });
  }
}

// LockoutEnabled: this.newRegisterForm.value.,
      // CampaignCode: this.newRegisterForm.value.,
      // AffiliateFieldId: this.newRegisterForm.value.,
      // AffiliateFieldName: this.newRegisterForm.value.,
       // IsAffiliateUser: this.newRegisterForm.value.,
