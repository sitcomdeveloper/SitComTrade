import { Component, OnInit } from '@angular/core';
import { AddressService } from './address.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

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
  detail: number;
  // tslint:disable-next-line: max-line-length
  constructor(private addressservice: AddressService, private fb: FormBuilder, private countryService: CountryService,
              private _route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) {}

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
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.addressservice.getAddress(details).subscribe(res => {
      this.userAddress = res;
      this.addressForm.patchValue({
        ipcountry: this.userAddress.CountryName,
        zipcode: this.userAddress.ZipCode,
        city: this.userAddress.City,
        state: this.userAddress.State,
        address: this.userAddress.StreetAddress,
      });
      console.log('address', res);
    });
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
    this.Country.forEach(element => {
      if ( element.Id === +this.addressForm.value.ipcountry) {
        this.addressForm.value.countryid = element.Name;
      }
    });
    const obj = {
      City: this.addressForm.value.city,
      State: this.addressForm.value.state,
      ZipCode: this.addressForm.value.zipcode,
      CountryId: this.addressForm.value.countryid,
      CountryName: this.addressForm.value.ipcountry,
      OwnerId: this.detail,
      StreetAddress: this.addressForm.value.address,
      Id: this.userAddress.Id,
      };
    this.addressservice.insertAddress(obj).subscribe(res => {
      this.spinnerService.show();
      this.modifyAddress = res;
      this.address();
      console.log('modifyadd', res);
      });
    this.normalMode = true;
    this.editMode = false;
  }
  // cancel
  cancel() {
    this.normalMode = true;
    this.editMode = false;
  }

}
