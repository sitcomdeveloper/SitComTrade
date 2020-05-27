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
  constructor(private bsmodal: BsModalRef, private groupsService: GroupsService) { }

  ngOnInit() {
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
