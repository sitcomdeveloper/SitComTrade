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

      deskid:[''],
      rolesid:[''],
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
      this.Desks = desks;
      console.log('Desks', desks);
    })
  }
  getDepartments() {
    this.settingsService.getAllDepartments().subscribe(departments => {
      this.Departments = departments;
      console.log('Departments', departments);
    })
  }
  getTimeZone() {
    this.settingsService.getAllTimeZones().subscribe(timezone => {
      this.TimeZones = timezone;
      console.log('TimeZones', timezone);
    })
  }
  getCultureCodes() {
    this.settingsService.getAllCultureCodes().subscribe(cultrecode => {
      this.CultureCode = cultrecode;
      console.log('CultureCode', cultrecode);
    })
  }
  getRoles() {
    this.settingsService.getAllRoles().subscribe(roles =>{
      this.Roles = roles;
      console.log('Roles', roles);
    })
  }
  getSenderSettings() {
    this.settingsService.getAllSenderSettings().subscribe(sndrsettings => {
      this.SenderSettings = sndrsettings;
      console.log('SenderSettings', sndrsettings);
    })
  }
  // getModulesGroup() {
  //   this.settingsService.getAllModulesGroups().subscribe(res => {
  //     this.ModulesGroups = res;
  //     console.log('ModulesGroups',res);
  //   })
  // }
  getModules() {
    this.settingsService.getAllModules().subscribe(modules => {
      this.Modules = modules;
      this.Clients = this.Modules.filter(clients => {
        if(clients.ModuleGroupName === 'Clients') {
          return clients;
        }
      })
      this.mdlen = this.Clients.length;
      console.log('clients', this.Clients.length);
      this.Activities = this.Modules.filter(activities => {
        if(activities.ModuleGroupName === 'Activities') {
          return activities;
        }
      })
      this.Reports = this.Modules.filter(reports => {
        if(reports.ModuleGroupName === 'Reports') {
          return reports;
        }
      })
      this.Settings = this.Modules.filter(settings => {
        if(settings.ModuleGroupName === 'Settings') {
          return settings;
        }
      })

      console.log('Modules', modules);
    })
   
  }
  // make the user registered
  svingDtls() {
    this.Desks.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.desk) {
        this.newRegisterForm.value.deskid = element.Name;
      }
    });
    this.Desks.forEach(element => {
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
    this.SenderSettings.forEach(element => {
      if ( element.Id === +this.newRegisterForm.value.defaultsendersetting) {
        this.newRegisterForm.value.defaultsendersettingid = element.Name;
      }
    });
    this.SenderSettings.forEach(element => {
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
      // IsAffiliateUser: this.newRegisterForm.value.,
      ImageName: this.newRegisterForm.value.image,
      // LockoutEnabled: this.newRegisterForm.value.,
      // CampaignCode: this.newRegisterForm.value.,
      // AffiliateFieldId: this.newRegisterForm.value.,
      // AffiliateFieldName: this.newRegisterForm.value.,
      RoleId: this.newRegisterForm.value.roles,
      RoleName: this.newRegisterForm.value.rolesid,
      DepartmentId: this.newRegisterForm.value.department,
      DepartmentName: this.newRegisterForm.value.departmentid,
      SharedDeskId: this.newRegisterForm.value.shareddesks,
      SharedDeskName: this.newRegisterForm.value.shareddesksid,
      TimezoneId: this.newRegisterForm.value.timezone,
      TimezoneName: this.newRegisterForm.value.timezoneid,
      CultureCode: this.newRegisterForm.value.culturecodeid,
      CultureCodeId: this.newRegisterForm.value.culturecode,
      UiCultureCode: this.newRegisterForm.value.uiculturecodeid,
      UiCultureCodeId: this.newRegisterForm.value.uiculturecode,
      StartModuleId: this.newRegisterForm.value.startmodule,
      StartModuleName: this.newRegisterForm.value.startmoduleid,
      DefaultSenderId: this.newRegisterForm.value.defaultsendersetting,
      DefaultSenderName: this.newRegisterForm.value.defaultsendersettingid,
      SharedSenderId: this.newRegisterForm.value.sharedsendersettings,
      SharedSenderName: this.newRegisterForm.value.sharedsendersettingsid,
      OwnerId: this.bindLoginData.UserId
    };
    this.settingsService.registeruser(rgstrusr).subscribe(user => {
      this.RegisteredUser = user;
      console.log('RegisteredUser',user);
    })
  }
}
