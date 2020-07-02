import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateItemComponent } from './create-item/create-item.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import * as $ from 'jquery'
import { DeleteComponent } from 'src/app/common/delete/delete.component';
@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  getGroupsData: any;
  Group: any;
  GroupLength: any;
  Leverage: any;
  deletbtnn = true;
  UserId: any;
  selectedchkbxfrdltgrp = [];
  constructor(private groupsService: GroupsService, private router: Router, private spinnerService: Ng4LoadingSpinnerService,
              private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getGroups();

    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
          $(".checkBoxClass").prop('checked', $(this).prop('checked'));
          var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>"+chlength+ " items checked from</span>");
      });
    })
  }
 getGroups() {
  this.spinnerService.show();
  this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
    setTimeout( () => {
    this.Group = result.reverse();
    this.spinnerService.hide();
    this.GroupLength = this.Group.length;
    // console.log('getGroup', result);
  }, 5000);
  });

 }
 getGeneralInfo(setItem: any) {
   this.router.navigate(['/groups-info', setItem,1]);
  // const url = this.router.serializeUrl(
  //   this.router.createUrlTree(['/groups-info', setItem])
  // );
  // window.open(url, '_blank');

 }
 newGroup() {
  const initialState = {
    title: 'Create Item',
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(data => {
    this.getGroups();
  });
}
deletbtn(val, userid) {
  this.UserId = userid
  if (val === true) {
    this.deletbtnn = false;
 this.selectedchkbxfrdltgrp.push(userid);
  } else {
    this.deletbtnn = true;
   this.selectedchkbxfrdltgrp.splice(this.selectedchkbxfrdltgrp.indexOf(userid), 1)
  }
}
// delete group
opendltgrppopup() {
  const initialState = {
    title: 'Delete Group',
    selectedgrpwilldltd: this.selectedchkbxfrdltgrp,
    // for div close or hide
    rmvGroup: 'rmvGroup' 
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(data => {
    this.getGroups();
  });
}
}
