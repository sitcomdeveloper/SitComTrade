import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateItemComponent } from './create-item/create-item.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  getGroupsData: any;
  Group: any;
  groupDetails: any;

  constructor(private groupsService: GroupsService, private router: Router, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getGroups();
  }
 getGroups() {
  this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
    this.Group = result.reverse();
    console.log('getGroup', result);
  });
 }
 getGeneralInfo() {
   this.router.navigateByUrl('/groups-info');
 }
 newGroup() {
  const initialState = {
    title: 'Create Item',
  };
  // tslint:disable-next-line: max-line-length
  this.bsModalRef = this.modalService.show(CreateItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
  this.bsModalRef.content.closeBtnName = 'Cancel';
  this.bsModalRef.content.clddata.subscribe(data => {
    this.getGroups();
  });
}
// for general info
getDetails() {
  // this.groupsService.getGroupDetails(obj).subscribe(result => {
  //   this.groupDetails = result;
  //   console.log('groupDetails', result);
  // })
}

}
