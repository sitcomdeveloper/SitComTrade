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
  editInfo = false;
  userInfoForm: FormGroup;
  Apptitle: any;
  name: any;
  Country: any;
  registrationType: any;
  details: number;
  // tslint:disable-next-line: max-line-length
  constructor(private _generalinfoservice: GeneralInfoService, private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService, private countryService: CountryService) { }

  ngOnInit() {
    this._route.params.subscribe(params => console.log(params));
    this._route.paramMap.subscribe(params => {
      this.stk = params.get('userid');
      if (this.stk === '1') {

        this.editGeneralInfo = true;

        this.editInfo = false;
      } else {
        this.editInfo = true;
      }
    });
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
      lasttaskdayspast: [''],
      daysagoclientcreated: ['']
    });
    this.spinnerService.show();
    setTimeout( () => {
    // this.Apptitle = JSON.parse(localStorage.getItem('project'));
    // this.spinnerService.hide();
    // console.log('getclientdata', this.Apptitle);
    // this.userGenralinfo = this.Apptitle;
    // this.usersInfo();
    this.edituserInfo();
  }, 5000);
    this.getcountryName();
    this.getRegistrationFromType();
    // receiving data from client page for general-info
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    console.log(details);
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
      console.log('generalinfo', res);
    });
  }
  // usersInfo() {
    // this._generalinfoservice.getUsersInfo(this.details).subscribe(res => {
    //   this.useraddinfo = res;
    //   console.log('generalinfo', res);
    // });
  // }
  edituserInfo() {
    // this._generalinfoservice.getUsersInfo().subscribe(res => {
    // this.Apptitle = JSON.parse(localStorage.getItem('project'));
    // console.log('geteditdata', this.Apptitle);
    // this.userGenralinfo = this.Apptitle;
    // this.useraddinfo = this.userGenralinfo;
    const date = this.userGenralinfo.CreatedAt.split('T');
    const userDate = date[0];
    this.userInfoForm.patchValue({
      firstName: this.userGenralinfo.FirstName,
      lastName: this.userGenralinfo.LastName,
      email: this.userGenralinfo.Email,
      phone: this.userGenralinfo.Phone,
      mobile: this.userGenralinfo.Mobile,
      secondemail: this.userGenralinfo.SecondEmail,
      itemid: this.userGenralinfo.ItemId,
      owner: this.userGenralinfo.OwnerId,
      status: this.userGenralinfo.ResponseStatus,
      createddate: userDate,
      // lastcommentdate:: this.userGenralinfo.,
      modifieddate: this.userGenralinfo.UpdatedAt,
      // conventionowner: this.userGenralinfo.
      // retentionowner: this.userGenralinfo.
      // citizenship: this.userGenralinfo.,
      // dob: this.userGenralinfo.,
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
      // registrationtype: this.userGenralinfo.,
      lasttaskdayspast: this.userGenralinfo.LastTaskDaysPast,
      daysagoclientcreated: this.userGenralinfo.DaysAgoClientCreated,
    });
    // });
  }
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }
  getRegistrationFromType() {
    this._generalinfoservice.getRegistrationType().subscribe(res => {
      this.registrationType = res;
      console.log('registeredtype', res);
    });
  }
}
