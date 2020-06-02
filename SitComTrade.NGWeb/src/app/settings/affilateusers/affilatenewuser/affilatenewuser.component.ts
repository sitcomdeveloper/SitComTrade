import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  response: string;
  submitted = false;
  title: any;
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
     
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.email]],
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      disabled: [''],
      desk: [''],
      roles: ['', [Validators.required]],
      department: [''],
      shareddesks: [''],
      timezone: [''],
      culturecode: [''],
      uiculturecode: [''],
      startmodule: [''],
      defaultsendersetting: [''],
      sharedsendersettings: [''],
      password: ['', [Validators.required]],
      repeatpassword: ['', [Validators.required]],
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
    if (this.newRegisterForm.valid) {
    const rgstrafflteuser = {
      FirstName: this.newRegisterForm.value.firstname,
LastName: this.newRegisterForm.value.lastname,
Email: this.newRegisterForm.value.email,
Phone: this.newRegisterForm.value.phone,
Password: this.newRegisterForm.value.password,
OwnerId: this.bindLoginData.UserId,
DeskId: '',
DeskName: '',
IsDisabled: '',
UserName: this.newRegisterForm.value.username,
IsAffiliateUser: '',
ImageName: '',
LockoutEnabled: this.newRegisterForm.value.lockoutenabled,
CampaignCode: this.newRegisterForm.value.campaigncode,
AffiliateFieldId: '',
AffiliateFieldName: '',
RoleId: '',
RoleName: this.newRegisterForm.value.roles,
DepartmentId: '',
DepartmentName: '',
SharedDeskId: '',
SharedDeskName: '',
TimezoneId: '',
TimezoneName: this.newRegisterForm.value.timezone,
CultureCode: this.newRegisterForm.value.culturecode,
CultureCodeId: '',
UiCultureCode: this.newRegisterForm.value.uiculturecode,
UiCultureCodeId: '',
StartModuleId: '',
StartModuleName: '',
DefaultSenderName: '',
DefaultSenderId: '',
SharedSenderName: '',
SharedSenderId: '',
    };
    this.settingsService.registeraffilateuser(rgstrafflteuser).subscribe(aafusrres => {
      this.affnewuser = aafusrres;
      this.clddata.emit(aafusrres);
      if (aafusrres === 'null') {
        this.response = '';
      } else {
        this.response = 'Affiliate User is added successfully!';
      }
      this.newRegisterForm.reset();
      console.log('affnewuser',aafusrres);
    })
  } else {
    this.submitted = true;
  }
  }
  get f() {
    return this.newRegisterForm.controls;
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
