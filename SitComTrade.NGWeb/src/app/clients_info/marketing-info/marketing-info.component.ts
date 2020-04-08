import { Component, OnInit } from '@angular/core';
import { MarketingInfoService } from './marketing-info.service';


@Component({
  selector: 'app-marketing-info',
  templateUrl: './marketing-info.component.html',
  styleUrls: ['./marketing-info.component.css']
})
export class MarketingInfoComponent implements OnInit {
userMarketingInfo:any;
  constructor(private marketinginfoservice:MarketingInfoService) { }

  ngOnInit() {
    this.marketingInfo();
  }
  marketingInfo(){
    // this.marketinginfoservice.getMarketingInfo().subscribe(res=>{
    //   this.userMarketingInfo=res;
    //   console.log('Marketinginfo',res);
    // },);
  }

}
