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
  clientAddress: any;
  modifyAddress: any;
  normalMode = true;
  editMode = false;
  // tslint:disable-next-line: max-line-length
  constructor(private addressservice: AddressService, private fb: FormBuilder, private countryService: CountryService) {this.editAddress(); }

  ngOnInit() {
    this.addressForm = this.fb.group({
      ipcountry: [''],
      zipcode: [''],
      city: [''],
      state: [''],
      address: [''],
     countryid: ['']
    });
    this.address();
    this.getcountryName();
  }
  address() {
    this.addressservice.getAddress(this.clientAddress).subscribe(res => {
      this.userAddress = res;
      console.log('address', res);
    });
  }

  editAddress() {
    this.addressservice.getAddress(this.clientAddress).subscribe(res => {
      this.userAddress = res;
      this.addressForm.patchValue({
        ipcountry: this.userAddress.CountryName,
        zipcode: this.userAddress.ZipCode,
        city: this.userAddress.City,
        state: this.userAddress.State,
        address: this.userAddress.StreetAddress,
      });
    });
  }
  updateAddress() {
    // this.Country.forEach(element => {
    //   if ( element.Id === +this.addressForm.value.ipcountry) {
    //     this.addressForm.value.countryid = element.Name;
    //   }
    // });
    const obj = {
    City: this.addressForm.value.city,
    State: this.addressForm.value.state,
    ZipCode: this.addressForm.value.zipcode,
    CountryId: 1,
    CountryName: this.addressForm.value.ipcountry,
    OwnerId: '1',
    StreetAddress: this.addressForm.value.address,
    Id: this.userAddress.Id
    }
    this.addressservice.insertAddress(obj).subscribe(res => {
      this.modifyAddress = res;
      console.log('modifyadd', res);
    });
    this.editAddress();
  }
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }
  // pencil
  showhide() {
    this.normalMode = false;
    this.editMode = true;
  }
  // apply btn
  closeshowhide() {
    this.normalMode = true;
    this.editMode = false;
  }
  // cancel
  cancel() {
    this.normalMode = true;
    this.editMode = false;
  }

}
