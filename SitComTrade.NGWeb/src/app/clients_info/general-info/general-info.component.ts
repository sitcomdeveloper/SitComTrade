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
  editInfo = false
  userInfoForm: FormGroup
  constructor(private _generalinfoservice: GeneralInfoService, private _router: Router, private _route: ActivatedRoute,private fb: FormBuilder) {this.edituserInfo(); }

  ngOnInit() {
    this._route.params.subscribe(params => console.log(params));
    this._route.paramMap.subscribe(params => {
      this.stk = params.get("userid");
      if(this.stk === "1") {
        
        this.editGeneralInfo = true;
        
        this.editInfo = false;
      } else {
        this.editInfo = true;
      }
    });
    this.userInfoForm = this.fb.group({
      firstName: [''],
      lastName:[''],
      email :[''],
      phone :[''],
      mobile :[''],
      secondemail :[''],
      itemid :[''],
      owner :[''],
      status: [''],
      createddate: [''],
      lastcommentdate: [''],
      modifieddate :[''],
      conventionowner :[''],
      retentionowner :[''],
      citizenship :[''],
      dob :[''],
      ftd :[''],
      ftddate :[''],
      enabled :[''],
      clienttime :[''],
      lastlogindate :[''],
      desk :[''],
      hastasks :[''],
      taskcreateddate :[''],
      taskdate :[''],
      assigneddate :[''],
      hasnotcompletedtasks :[''],
      totaldeposits :[''],
      ftdamount :[''],
      totalwithdrawals :[''],
      netdeposits :[''],
      type :[''],
      firstregistrationdate :[''],
      registrationtype :[''],
      lasttaskdayspost :[''],
      daysagoclientcreated :['']
    })
    this.usersInfo();
  }
  usersInfo() {

    this._generalinfoservice.getUsersInfo().subscribe(res => {
      this.userGenralinfo = res;
      console.log('generalinfo', res);
    });
  }
edituserInfo() {
  this._generalinfoservice.getUsersInfo().subscribe(res => {
    this.userGenralinfo = res;
    let date = this.userGenralinfo.CreatedAt.split('T');
    let userDate = date[0];
    this.userInfoForm.patchValue({
      firstName: this.userGenralinfo.FirstName,
      lastName: this.userGenralinfo.LastName,
      email: this.userGenralinfo.Email,
      phone: this.userGenralinfo.Phone,
      mobile: this.userGenralinfo.Mobile,
      secondemail: this.userGenralinfo.SecondEmail,
      // itemid: this.userGenralinfo.ItemId
      owner: this.userGenralinfo.OwnerId,
      status: this.userGenralinfo.StatusName,
      createddate: userDate
      // lastcommentdate:: this.userGenralinfo.
      // modifieddate: this.userGenralinfo.
      // conventionowner: this.userGenralinfo.
      // retentionowner: this.userGenralinfo.
      // citizenship: this.userGenralinfo.
      


    })
  });
}
}
