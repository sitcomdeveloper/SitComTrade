import { Component, OnInit } from '@angular/core';
import { GroupsService } from './groups.service';
import { Router } from '@angular/router';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateItemComponent } from './create-item/create-item.component';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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

  constructor(private groupsService: GroupsService, private router: Router, private spinnerService: Ng4LoadingSpinnerService,
              private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getGroups();
  }
 getGroups() {
  this.spinnerService.show();
  this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
    setTimeout( () => {
    this.Group = result.reverse();
    this.spinnerService.hide();
    this.GroupLength = this.Group.length;
    console.log('getGroup', result);
  }, 5000);
  });

 }
 getGeneralInfo(setItem: any) {
  //  this.router.navigate(['/groups-info', setItem]);
  const url = this.router.serializeUrl(
    this.router.createUrlTree(['/groups-info', setItem])
  );
  window.open(url, '_blank');

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
}
