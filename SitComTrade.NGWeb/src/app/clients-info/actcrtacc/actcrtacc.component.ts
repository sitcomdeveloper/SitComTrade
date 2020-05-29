import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupsService } from 'src/app/settings/groups/groups.service';

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
  constructor(private bsmodal: BsModalRef, private groupsService: GroupsService) { }

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
      console.log('Group', result);
    });
   }
}
