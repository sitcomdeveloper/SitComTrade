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
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

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
      image:this.takewholedata.ImageName,
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
  hideModal() {
    this.bsmodal.hide();
  }
}
