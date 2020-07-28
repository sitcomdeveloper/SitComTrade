import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tradeaccount-info',
  templateUrl: './tradeaccount-info.component.html',
  styleUrls: ['./tradeaccount-info.component.css']
})
export class TradeaccountInfoComponent implements OnInit {
  realTradeUsers: any;
  assigntradeaccountdetails: number;

  constructor(private clientsService: ClientsService, private route: ActivatedRoute) { }

  ngOnInit() {
    // receiving data from trade account page for trade acc. general-info
    const tradeaccountdetails = +this.route.snapshot.paramMap.get('selectedinfo');
    this.assigntradeaccountdetails = tradeaccountdetails;
    this.clientsService.getTradeAccountdetailsbyId(tradeaccountdetails).subscribe(trdeusersDetails => {
      this.realTradeUsers = trdeusersDetails;
      console.log('realTradeUsers', trdeusersDetails);
    })
  }

}
