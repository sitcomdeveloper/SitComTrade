import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../general-info/general-info.service';

@Component({
  selector: 'app-trade-accounts',
  templateUrl: './trade-accounts.component.html',
  styleUrls: ['./trade-accounts.component.css']
})
export class TradeAccountsComponent implements OnInit {
  detail: number;
  userGenralinfo: any;

  constructor(private route: ActivatedRoute, private generalinfoservice: GeneralInfoService) { }

  ngOnInit() {
    const details = +this.route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
    });
  }
  }
