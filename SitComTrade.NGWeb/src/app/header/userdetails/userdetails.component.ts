import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  newRegisterForm: FormGroup;
  Departments: any;
  TimeZones: any;
  CultureCode: any;
  response: string;
  savedtls: any;
  getLoginDetails: any;
  bindLoginData: any;
  takewholedata: any;
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
    this.getDepartments();
    this.getTimeZone();
    this.getCultureCodes();
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
      SharedDeskId: '',
      SharedDeskName: this.newRegisterForm.value.shareddesks,
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
