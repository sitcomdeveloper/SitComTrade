import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '././general-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CountryService } from 'src/app/services/country.service';


@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  userGenralinfo: any;
  stk: any;
  editGeneralInfo = false;
  frontGeneralInfo = true;
  editInfo = false;
  userInfoForm: FormGroup;
  Apptitle: any;
  name: any;
  Country: any;
  registrationType: any;
  details: number;
  updatedDtls: any;
  detail: number;
  Status: any;
  getLoginDetails: any;
  bindLoginData: any;
  monetarytransactions = false;
  mnetarytrnsactions: any;
  userinformation = true;
  userinfo: any;
  value: any;
  countryPhoneCode: any;
  // tslint:disable-next-line: max-line-length
  constructor(private _generalinfoservice: GeneralInfoService, private _router: Router,
              // tslint:disable-next-line: max-line-length
              private _route: ActivatedRoute, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private countryService: CountryService) { }

  ngOnInit() {
    // if(this.value === 'userinfo') {
    //   this.userinformation = true;
    // } else {
    //   this.userinformation = false;
    // }
    // code for receiving login details and bind owner name at place of  name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;

    this.userInfoForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      mobile: [''],
      secondemail: [''],
      itemid: [''],
      owner: [''],
      status: [''],
      statusid: [''],
      createddate: [''],
      lastcommentdate: [''],
      modifieddate: [''],
      conventionowner: [''],
      retentionowner: [''],
      citizenship: [''],
      dob: [''],
      ftd: [''],
      ftddate: [''],
      enabled: [''],
      clienttime: [''],
      lastlogindate: [''],
      desk: [''],
      hastasks: [''],
      taskcreateddate: [''],
      taskdate: [''],
      assigneddate: [''],
      hasnotcompletedtasks: [''],
      totaldeposits: [''],
      ftdamount: [''],
      totalwithdrawals: [''],
      netdeposits: [''],
      type: [''],
      firstregistrationdate: [''],
      registrationtype: [''],
      registrationtypeid: [''],
      lasttaskdayspast: [''],
      daysagoclientcreated: [''],
      countryid: [''],
      phoneCode: [''],
    });
    this.getcountryName();
    this.getRegistrationFromType();
    this.getAllStatus();

    // receiving data from client page for general-info
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
      this.userInfoForm.patchValue({
        firstName: this.userGenralinfo.FirstName,
        lastName: this.userGenralinfo.LastName,
      email: this.userGenralinfo.Email,
      phoneCode: this.userGenralinfo.CountryISDCode,
      phone: this.userGenralinfo.Phone,
      mobile: this.userGenralinfo.Mobile,
      secondemail: this.userGenralinfo.SecondEmail,
      itemid: this.userGenralinfo.ItemId,
      owner: this.bindLoginData.FullName,
      status: this.userGenralinfo.ResponseStatus,
      createddate: this.userGenralinfo.CreatedAt,
      // lastcommentdate:: this.userGenralinfo.,
      modifieddate: this.userGenralinfo.UpdatedAt,
      // conventionowner: this.userGenralinfo.
      // retentionowner: this.userGenralinfo.
      citizenship: this.userGenralinfo.CountryName,
      dob: this.userGenralinfo.DateOfBirth,
      ftd: this.userGenralinfo.Ftd,
      // ftdate: this.userGenralinfo.,
      enabled: this.userGenralinfo.Enabled,
      // clienttime: this.userGenralinfo.,
      // lastlogindate: this.userGenralinfo.,
      desk: this.userGenralinfo.Desk,
      // hastasks: this.userGenralinfo.,
      // taskcreateddate: this.userGenralinfo.,
      // taskdate: this.userGenralinfo.,
      assigneddate: this.userGenralinfo.AssignedDate,
      // hasnotcompletedtasks: this.userGenralinfo.,
      // totaldeposits: this.userGenralinfo.,
      // ftdamount: this.userGenralinfo.,
      // totalwithdrawals: this.userGenralinfo.,
      // netdeposits: this.userGenralinfo.,
      type: this.userGenralinfo.TypeName,
      firstregistrationdate: this.userGenralinfo.FirstRegistrationDate,
      registrationtype: this.userGenralinfo.RegistrationType,
      // lasttaskdayspast: this.userGenralinfo.LastTaskDaysPast,
      daysagoclientcreated: this.userGenralinfo.DaysAgoClientCreated,
      });
      // console.log('generalinfo', res);
    });
    // if(this.mnetarytrnsactions === 'mnetarytrnsactions') {
    //   this.monetarytransactions = true;
    // } else {
    //   this.monetarytransactions = false;
    // }
  }
    // this.useraddinfo = this.userGenralinfo;
    // const date = this.userGenralinfo.CreatedAt.split('T');
    // const userDate = date[0];
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
    });
  }
  getRegistrationFromType() {
    this._generalinfoservice.getRegistrationType().subscribe(res => {
      this.registrationType = res;
    });
  }
  // for hide show div
  // pencil
  hideshow() {
    this.frontGeneralInfo = false;
    this.editGeneralInfo = true;
  }
  // cancel btn
  closehideshow() {
    this.frontGeneralInfo = true;
    this.editGeneralInfo = false;
  }
  // apply btn.update the details of user
  savehideshow() {
    this.Country.forEach(element => {
      if ( element.Id === +this.userInfoForm.value.citizenship) {
        this.userInfoForm.value.countryid = element.Name;
      }
    });
    this.Status.forEach(element => {
      if ( element.Id === +this.userInfoForm.value.status) {
        this.userInfoForm.value.statusid = element.Name;
      }
    });
    this.registrationType.forEach(element => {
      if ( element.Id === +this.userInfoForm.value.registrationtype) {
        this.userInfoForm.value.registrationtypeid = element.Name;
      }
    });
    const obj = {
      OwnerId: this.userGenralinfo.OwnerId,
      FirstName: this.userInfoForm.value.firstName,
      LastName: this.userInfoForm.value.lastName,
      Email: this.userInfoForm.value.email,
      CountryISDCode: this.userInfoForm.value.phoneCode,
      Phone: this.userInfoForm.value.phone,
      Mobile: this.userInfoForm.value.mobile,
      SecondEmail: this.userInfoForm.value.secondemail,
      Password: this.userGenralinfo.Password,
      ResponseStatusId: this.userInfoForm.value.statusid,
      ResponseStatus: this.userInfoForm.value.status,
      CurrencyId: '',
      CurrencyName: '',
      CountryId: this.userInfoForm.value.citizenship,
      CountryName: this.userInfoForm.value.countryid,
      DateOfBirth: this.userInfoForm.value.dob,
      FTD: this.userInfoForm.value.ftd,
      FTDDate: '',
      Enabled: this.userInfoForm.value.enabled,
      RetentionOwner: '',
      ConvertionOwner: '',
      TypeName: this.userInfoForm.value.type,
      AssignedDate: '',
      FirstRegistrationDate: '',
      ImportId: '',
      GroupName: this.userGenralinfo.GroupName,
      GroupId: this.userGenralinfo.GroupId,
      Desk: '',
      RegistrationType: this.userInfoForm.value.registrationtype,
      RegistrationTypeId: this.userInfoForm.value.registrationtypeid,
      LastTaskDaysPast: '',
      DaysAgoClientCreated: '',
      ISendEmail: this.userGenralinfo.ISendEmail,
      CitizenshipId: '',
      DeskId: '',
      TypeId: '', 
      ItemId: this.userGenralinfo.ItemId,
      Id: this.userGenralinfo.Id,
    };
    this._generalinfoservice.updateClient(obj).subscribe(res => {
      // this.spinnerService.show();
      this.updatedDtls = res;
      // console.log('updatedDtls', res);
      
      this.afterUpdate();
      this.frontGeneralInfo = true;
      this.editGeneralInfo = false;
    });

  }
  // API call for getting details from clients page to general-info page
  afterUpdate() {
    this._generalinfoservice.getUsersInfo(this.detail).subscribe(res => {
      this.userGenralinfo = res;
  });
  }
  // get status
  getAllStatus() {
    this._generalinfoservice.getStatus().subscribe(response => {
      this.Status = response;
    });
  }
  getPhoneCode(val: any) {
    this.Country.forEach(element => {
      const y = +val;
      if (element.Id === y) {
        this.countryPhoneCode = element.ISDCode;
      }
    });
    this.userInfoForm.controls.phoneCode.setValue(
      '+' + this.countryPhoneCode
    );
  }
}
