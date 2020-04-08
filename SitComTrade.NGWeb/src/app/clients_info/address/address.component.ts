import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userAddress:any;
  constructor(private addressservice:AddressService) { }

  ngOnInit() {
    this.address();
  }
  address() {
    // this.addressservice.getAddress().subscribe(res=>{
    //   this.userAddress=res;
    //   console.log('address',res);
    // })
  }

}
