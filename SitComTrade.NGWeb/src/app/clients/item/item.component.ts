import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  getnewClients: any;
  

  constructor(private clientService: ClientsService) { }
  // Parameters of addnewuser api
  FirstName = 'Lead';
 LastName = 'Lead';
 Email = 'Lead';
 CountryId = 0;
CurrencyName = 'hdfdf';
 Promocode = 'Lead';
Password = 'Lead';
 CountryName = 'Lead';
CurrencyId = 0;
OwnerId = 'Lead';
Phone = 'Lead';

  ngOnInit() {
  }
  newClients() {
    let obj = {
      FirstName:'Lead',
      LastName :'Lead',
      Email:'Lead',
      CountryId:0,
     CurrencyName :'hdfdf',
      Promocode :'Lead',
     Password:'Lead',
      CountryName:'Lead',
     CurrencyId:0,
     OwnerId:'Lead',
     Phone:'Lead'
    }
    this.clientService.addnewClients(obj).subscribe(res =>{
      this.getnewClients = res;
      console.log('newuser', res);
    })
  }

}
