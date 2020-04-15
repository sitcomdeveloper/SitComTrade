import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '././general-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  useraddinfo: any;
  constructor(private _generalinfoservice: GeneralInfoService, private _router: Router, private _route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit() {
    this._route.params.subscribe(params => console.log(params));
    this._route.paramMap.subscribe(params => {
      this.stk = params.get("userid");
      if (this.stk === "1") {

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
    this.Apptitle = JSON.parse(localStorage.getItem('project'));
    console.log('getclientdata', this.Apptitle);
    this.userGenralinfo = this.Apptitle;
    // this.usersInfo();
    this.edituserInfo();
  }
  // usersInfo() {

  //   this._generalinfoservice.getUsersInfo().subscribe(res => {
  //     this.useraddinfo= res;
  //     console.log('generalinfo', res);
  //   });
  // }
  edituserInfo() {
    // this._generalinfoservice.getUsersInfo().subscribe(res => {
    this.Apptitle = JSON.parse(localStorage.getItem('project'));
    console.log('geteditdata', this.Apptitle);
    this.userGenralinfo = this.Apptitle;
    this.useraddinfo = this.userGenralinfo;
    const date = this.useraddinfo.CreatedDate.split('T');
    const userDate = date[0];
    this.userInfoForm.patchValue({
      firstName: this.useraddinfo.FirstName,
      lastName: this.useraddinfo.LastName,
      email: this.useraddinfo.Email,
      phone: this.useraddinfo.Phone,
      mobile: this.useraddinfo.Mobile,
      secondemail: this.useraddinfo.SecondEmail,
      itemid: this.useraddinfo.ItemId,
      owner: this.useraddinfo.OwnerId,
      status: this.useraddinfo.StatusName,
      createddate: userDate,
      // lastcommentdate:: this.userGenralinfo.,
      modifieddate: this.useraddinfo.UpdatedAt,
      // conventionowner: this.userGenralinfo.
      // retentionowner: this.userGenralinfo.
      // citizenship: this.userGenralinfo.,
      // dob: this.userGenralinfo.,
      ftd: this.useraddinfo.Ftd,
      // ftdate: this.userGenralinfo.,
      enabled: this.useraddinfo.Enabled,
      // clienttime: this.userGenralinfo.,
      // lastlogindate: this.userGenralinfo.,
      desk: this.useraddinfo.Desk,
      // hastasks: this.userGenralinfo.,
      // taskcreateddate: this.userGenralinfo.,
      // taskdate: this.userGenralinfo.,
      assigneddate: this.useraddinfo.AssignedDate,
      // hasnotcompletedtasks: this.userGenralinfo.,
      // totaldeposits: this.userGenralinfo.,
      // ftdamount: this.userGenralinfo.,
      // totalwithdrawals: this.userGenralinfo.,
      // netdeposits: this.userGenralinfo.,
      // type: this.userGenralinfo.TypeName,
      firstregistrationdate: this.useraddinfo.FirstRegistrationDate,
      // registrationtype: this.userGenralinfo.,
      lasttaskdayspast: this.useraddinfo.LastTaskDaysPast,
      daysagoclientcreated: this.useraddinfo.DaysAgoClientCreated,
    });
    // });
  }
}
