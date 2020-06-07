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
  wholeuserdetails: any;
  loginusrdtls: any;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
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
    this.userDetails();
  }
  // get user details
  userDetails() {
    this.settingsService.getUserDetails(this.bindLoginData.UserId).subscribe(usrdtls => {
      this.loginusrdtls = usrdtls;
      console.log('loginusrdtls',usrdtls);
    })
  }
  getDepartments() {
    this.settingsService.getAllDepartments().subscribe(departments => {
      this.Departments = departments;
    });
  }
  getTimeZone() {
    this.settingsService.getAllTimeZones().subscribe(timezone => {
      this.TimeZones = timezone;
    });
  }
  getCultureCodes() {
    this.settingsService.getAllCultureCodes().subscribe(cultrecode => {
      this.CultureCode = cultrecode;
    });
  }
  // patch value
  // patchCrmUsers() {
  //   this.newRegisterForm.patchValue({
  //     firstname:this.wholeuserdetails.FirstName,
  //     lastname:this.wholeuserdetails.LastName,
  //     username:this.wholeuserdetails.UserName,
  //     email:this.wholeuserdetails.Email,
  //     phone:this.wholeuserdetails.Phone,
  //     department:this.wholeuserdetails.DepartmentName,
  //     timezone:this.wholeuserdetails.TimezoneName,
  //     culturecode:this.wholeuserdetails.CultureCode,
  //     uiculturecode:this.wholeuserdetails.UiCultureCode,
  //     startmodule:this.wholeuserdetails.StartModuleName,
  //   })
  // }
  // save details of user after patch
  saveeditinfo() {
    const updt = {
      FirstName: this.newRegisterForm.value.firstname,
      LastName: this.newRegisterForm.value.lastname,
      Email: this.newRegisterForm.value.email,
      Phone: this.newRegisterForm.value.phone,
      Password: this.newRegisterForm.value.password,
      OwnerId: this.bindLoginData.UserId,
      Id: this.loginusrdtls.Id,
      DeskId: '',
      DeskName: '',
      IsDisabled: '',
      UserName: this.newRegisterForm.value.username,
      IsAffiliateUser: '',
      ImageName: '',
      LockoutEnabled: '',
      CampaignCode: '',
      AffiliateFieldId: '',
      AffiliateFieldName: '',
      RoleId: '',
      RoleName: '',
      DepartmentId: '',
      DepartmentName: this.newRegisterForm.value.department,
      SharedDeskId: '',
      SharedDeskName: '',
      TimezoneId: '',
      TimezoneName: this.newRegisterForm.value.timezone,
      CultureCode: this.newRegisterForm.value.culturecode,
      CultureCodeId: '',
      UiCultureCode: this.newRegisterForm.value.uiculturecode,
      UiCultureCodeId: '',
      StartModuleId: '',
      StartModuleName: this.newRegisterForm.value.startmodule,
      DefaultSenderName: '',
      DefaultSenderId: '',
      SharedSenderName: '',
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
      // this.newRegisterForm.reset();
  console.log('savedtls',updateusr);
})
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
