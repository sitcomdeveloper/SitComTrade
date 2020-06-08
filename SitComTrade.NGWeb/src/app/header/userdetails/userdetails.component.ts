import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from 'src/app/settings/settings.service';
import { MustMatch } from 'src/app/common/validators/confirm-password.validator';

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
  submitted = false;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    
    this.newRegisterForm = this.fb.group({
      image: [''],
      firstname: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.email]],
      phone: ['', [Validators.required]],
      disabled: [''],
      desk: [''],
      roles: [''],
      department: ['', [Validators.required]],
      shareddesks: [''],
      timezone: ['', [Validators.required]],
      culturecode: ['', [Validators.required]],
      uiculturecode: ['', [Validators.required]],
      startmodule: ['', [Validators.required]],
      defaultsendersetting: [''],
      sharedsendersettings: [''],
      password: ['', [ Validators.minLength(6)]],
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
    }, {
      validator: MustMatch('password', 'repeatpassword')
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
      this.newRegisterForm.patchValue({
        username: this.loginusrdtls.UserName,
           firstname: this.loginusrdtls.FirstName,
           lastname: this.loginusrdtls.LastName,
           email: this.loginusrdtls.Email,
           phone: this.loginusrdtls.Phone,
           department: this.loginusrdtls.DepartmentName,
           timezone: this.loginusrdtls.TimezoneName,
           culturecode: this.loginusrdtls.CultureCode,
           uiculturecode: this.loginusrdtls.UiCultureCode,
           startmodule: this.loginusrdtls.StartModuleName   
      });
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
    if (this.newRegisterForm.valid) {
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
  this.userDetails();
  this.clddata.emit(updateusr);
      if (updateusr === null) {
        this.response = 'User is updated successfully!';
      } else {
        this.response = '';
      }
  console.log('savedtls',updateusr);
})
} else {
  this.submitted = true;
}
  }
  hideModal() {
    this.bsmodal.hide();
  }
  get f() {
    return this.newRegisterForm.controls;
  }
  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: repeatpassword } = formGroup.get('repeatpassword');
    return password === repeatpassword ? null : { passwordNotMatch: true };
  }
}
