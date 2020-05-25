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

  constructor(private bsmodal: BsModalRef, private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit() {
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
      timezoneid: [''],
      culturecode: [''],
      uiculturecode: [''],
      startmoduleid: [''],
      defaultsendersetting: [''],
      sharedsendersettings: [''],
      password: [''],
      repeatpassword: [''],
    });
    this.getDesks();
    this.getDepartments();
    this.getTimeZone();
    this.getCultureCodes();
    this.getRoles();
    this.getSenderSettings();
    this.getModules();
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
  getModules() {
    this.settingsService.getAllModules().subscribe(modules => {
      this.Modules = modules;
      this.Clients = this.Modules.filter(clients => {
        if(clients.ModuleGroupName === 'Clients') {
          return clients;
        }
      })
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
    const rgstrusr = {
      FirstName: this.newRegisterForm.value.firstname,
      LastName: this.newRegisterForm.value.lastname,
      Email: this.newRegisterForm.value.email, 
      Phone: this.newRegisterForm.value.phone,
      // Password: this.newRegisterForm.value.,
      // OwnerId: this.newRegisterForm.value.,
      // DeskId: this.newRegisterForm.value., 
      IsDisabled: this.newRegisterForm.value.disabled,
      UserName: this.newRegisterForm.value.username,
      // IsAffiliateUser: this.newRegisterForm.value.,
      // ImageName: this.newRegisterForm.value.image,
      // LockoutEnabled: this.newRegisterForm.value.,
      // CampaignCode: this.newRegisterForm.value.,
      // AffiliateFieldId: this.newRegisterForm.value.,
      // AffiliateFieldName: this.newRegisterForm.value.,
      // DeskName: this.newRegisterForm.value.desk,
      // RoleId: this.newRegisterForm.value.,
      // RoleName: this.newRegisterForm.value.roles,
      // DepartmentId: this.newRegisterForm.value.,
      DepartmentName: this.newRegisterForm.value.department,
      // SharedDeskId: this.newRegisterForm.value.,
      // TimezoneId: this.newRegisterForm.value.,
      TimezoneName: this.newRegisterForm.value.timezoneid,
      CultureCode: this.newRegisterForm.value.culturecode,
      // CultureCodeId: this.newRegisterForm.value.,
      UiCultureCode: this.newRegisterForm.value.uiculturecode,
      // UiCultureCodeId: this.newRegisterForm.value.,
      // StartModuleId: this.newRegisterForm.value.,
      StartModuleName: this.newRegisterForm.value.startmoduleid,
      // DefaultSenderId: this.newRegisterForm.value.,
      DefaultSenderName: this.newRegisterForm.value.defaultsendersetting,
      // SharedSenderId: this.newRegisterForm.value.,
      SharedSenderName: this.newRegisterForm.value.sharedsendersettings,
    };
    this.settingsService.registeruser(rgstrusr).subscribe(user => {
      this.RegisteredUser = user;
      console.log('RegisteredUser',user);
    })
  }
}
