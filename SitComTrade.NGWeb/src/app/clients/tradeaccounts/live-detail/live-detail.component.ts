import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { ClientsService } from 'src/app/header/clients/clients.service';

@Component({
  selector: 'app-live-detail',
  templateUrl: './live-detail.component.html',
  styleUrls: ['./live-detail.component.css']
})
export class LiveDetailComponent implements OnInit {
  tradedetail: number;
  editMode = false;
  normalMode = true;
  groupDetails: any;
  fetchTradeDetails: any;

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private clientsservice: ClientsService) { }

  ngOnInit() {
    // for getting data on frame
    const tradedetails = +this.route.snapshot.paramMap.get('trdingDtls');
    this.tradedetail = tradedetails;
    const obj = {
      tradedetails,
      TypeName : 'Real',
      OwnerId  : 1
    };
    this.clientsservice.getTradeUsers(obj).subscribe(res => {
      this.fetchTradeDetails = res;
      // console.log('tradeusers', res);
     });
  }
  // pencil
  showhide() {
    this.normalMode = false;
    this.editMode = true;
  }
  // Apply
  closeshowhide() {
    this.normalMode = true;
    this.editMode = false;
  }
  // cancel
  cancel() {
    this.normalMode = true;
    this.editMode = false;
  }
  // tradeDetails() {
  //   const obj = {
  //     TypeName : 'Real',
  //     OwnerId  : 1
  //   };
  //   this.clientsservice.getTradeUsers(obj).subscribe(res => {
  //    this.fetchTradeDetails = res.reverse();
  //    this.tradeAccountLength = res.length;
  //    console.log('tradeusers', res);
  //   });
  // }

}
