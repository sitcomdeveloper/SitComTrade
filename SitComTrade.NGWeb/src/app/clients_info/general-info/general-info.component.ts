import { Component, OnInit } from '@angular/core';
import { GeneralInfoService } from '././general-info.service';
import { FormGroup } from '@angular/forms';
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
  userInfoForm: FormGroup
  constructor(private _generalinfoservice: GeneralInfoService, private _router: Router, private _route: ActivatedRoute,) { }

  ngOnInit() {
    this._route.params.subscribe(params => console.log(params));
    this._route.queryParams.subscribe(params => {
      this.stk = params["1"];
      if(this.stk === "1") {
        this.editGeneralInfo = true;
      }
    });
    this.usersInfo();
  }
  usersInfo() {

    this._generalinfoservice.getUsersInfo().subscribe(res => {
      this.userGenralinfo = res;
      console.log('generalinfo', res);
    });
  }

}
