import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralInfoService } from '../general-info/general-info.service';

@Component({
  selector: 'app-trade-accounts',
  templateUrl: './trade-accounts.component.html',
  styleUrls: ['./trade-accounts.component.css']
})
export class TradeAccountsComponent implements OnInit {
  detail: number;
  userinfo: any;
  noaccount = false;
  tradeaccoountlength: any;
  constructor(private route: ActivatedRoute, private router:Router, private generalinfoservice: GeneralInfoService) { }

  ngOnInit() {
    const details = +this.route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.generalinfoservice.GetTradeAccountListByClientId(details).subscribe(res => {
      this.userinfo = res;
      this.tradeaccoountlength = res.length;
      if(this.tradeaccoountlength === 0) {
        this.noaccount = true;
      } else {
        this.noaccount = false;
      }
    });
  }
  movetoTradeaccountInfo(selectedinfo: any) {
    this.router.navigate(['/trade-info', selectedinfo]);
  }
   // groups-info
   getGeneralInfo(setItem: any) {
    //  this.router.navigate(['/groups-info', setItem]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/groups-info', setItem,1])
    );
    window.open(url, '_blank');
  }
}