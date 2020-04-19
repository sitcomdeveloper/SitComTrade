import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  userAddress: any;
  name: any;
  Country: any;
  addressForm: FormGroup;
  constructor(private addressservice: AddressService, private fb: FormBuilder, private countryService: CountryService) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      ipcountry: ['']
    });
    this.address();
    this.getcountryName();
  }
  address() {
    // this.addressservice.getAddress().subscribe(res=>{
    //   this.userAddress=res;
    //   console.log('address',res);
    // })
  }
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }

}
