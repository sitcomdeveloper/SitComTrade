import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-affilatenewuser',
  templateUrl: './affilatenewuser.component.html',
  styleUrls: ['./affilatenewuser.component.css']
})
export class AffilatenewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  createuser: any;
  addrole: any;
  crtusr = false;
  adrole = false;
  newRegisterForm: FormGroup;
  getLoginDetails: any;
  bindLoginData: any;
  TimeZones: any;
  CultureCode: any;
  affnewuser: any;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    // code for receiving login details and bind owner name at place of  name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    
    if(this.createuser === 'createuser') {
      this.crtusr = true;
    } else {
      this.crtusr = false;
    }
    if(this.addrole === 'addrole') {
      this.adrole = true;
    } else {
      this.adrole = false;
    }
    this.newRegisterForm = this.fb.group({
     
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
      lockoutenabled: [''],
      campaigncode: [''],
      owner: [''],

      deskid: [''],
      rolesid: [''],
      departmentid: [''],
      shareddesksid: [''],
      timezoneid: [''],
      culturecodeid: [''],
      uiculturecodeid: ['']
    });
    this.getTimeZone();
    this.getCultureCodes();
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
  // create new affilate user
  crtaffilateuser() {
    const rgstrafflteuser = {
      FirstName: this.newRegisterForm.value.firstname,
LastName: this.newRegisterForm.value.lastname,
Email: this.newRegisterForm.value.email,
Phone: this.newRegisterForm.value.phone,
Password: this.newRegisterForm.value.password,
OwnerId: this.bindLoginData.UserId,
DeskId: '',
DeskName: '',
IsDisabled: this.newRegisterForm.value.disabled,
UserName: this.newRegisterForm.value.username,
IsAffiliateUser: 'true',
ImageName: this.newRegisterForm.value.image,
LockoutEnabled: this.newRegisterForm.value.lockoutenabled,
CampaignCode: this.newRegisterForm.value.campaigncode,
AffiliateFieldId: '',
AffiliateFieldName: 'gh',
RoleId: '',
RoleName: this.newRegisterForm.value.roles,
DepartmentId: '',
DepartmentName: this.newRegisterForm.value.departmentid,
SharedDeskId: '',
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
    this.settingsService.registeraffilateuser(rgstrafflteuser).subscribe(aafusrres => {
      this.affnewuser = aafusrres;
      console.log('affnewuser',aafusrres);
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
