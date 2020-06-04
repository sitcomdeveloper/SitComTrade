import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actcrtacc',
  templateUrl: './actcrtacc.component.html',
  styleUrls: ['./actcrtacc.component.css']
})
export class ActcrtaccComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  Group: any;
  getGroupsData: any;
  createaccount: any;
  crtacct = false;
  sendemail: any;
  sndeml = false;
  sndsms = false;
  sendsms: any;
  vwhistory = false;
  viewhistory: any;
  title: any;
  userGenralinfo: any;
  detailss: any;
  constructor(private bsmodal: BsModalRef, private groupsService: GroupsService,private _generalinfoservice: GeneralInfoService,private _route: ActivatedRoute) { }

  ngOnInit() {
    if (this.createaccount === 'createaccount') {
      this.crtacct = true;
    } else {
      this.crtacct = false;
    }
    if (this.sendemail === 'sendemail') {
      this.sndeml = true;
    } else {
      this.sndeml = false;
    }
    if (this.sendsms === 'sendsms') {
      this.sndsms = true;
     // API of general section use for showing phone no. on actions 'sendsms' popup
     this._generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
       this.userGenralinfo = res;
       console.log('generalinfop', res)
     });
    } else {
      this.sndsms = false;
    }
    if (this.viewhistory === 'viewhistory') {
      this.vwhistory = true;
    } else {
      this.vwhistory = false;
    }
    this.getGroups();
  }
  hideModal() {
    this.bsmodal.hide();
  }
  // get all groups
  getGroups() {
    this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result.reverse();
    });
   }
}
