import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { FormGroup } from '@angular/forms';

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
  realTradeUsers: any;
  Leverage: any;
  tradeaccountInfoForm: FormGroup

  constructor(private route: ActivatedRoute, private groupService: GroupsService, private clientsservice: ClientsService) { }

  ngOnInit() {
    // for getting data on frame
    const tradedetails = +this.route.snapshot.paramMap.get('trdingDtls');
    this.tradedetail = tradedetails;
    this.clientsservice.getTradeAccountdetailsbyId(tradedetails).subscribe(trdeusersDetails => {
      this.realTradeUsers = trdeusersDetails;
      console.log('realTradeUsers', trdeusersDetails);
      // this.tradeaccountInfoForm.patchValue({
      //   firstname: this.realTradeUsers.FirstName,
     });
     this.getLeverages();
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
  // get all leverages
  getLeverages() {
    this.groupService.getAllLverages().subscribe(rspnse => {
      this.Leverage = rspnse;
    });
  }
}

