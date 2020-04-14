import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';

@Component({
  selector: 'app-tradeaccounts',
  templateUrl: './tradeaccounts.component.html',
  styleUrls: ['./tradeaccounts.component.css']
})
export class TradeaccountsComponent implements OnInit {

  constructor(private clientsservice:ClientsService) { }
  tradeInfo: any[];
  fetchTradeDetails: any[];


  ngOnInit() {
    this.tradeDetails();
  }
  tradeDetails() {
    this.clientsservice.getTradeUsers(this.tradeInfo).subscribe(res =>{
      this.fetchTradeDetails = res;
      console.log('tradeusers',res);
    })
  }

}
