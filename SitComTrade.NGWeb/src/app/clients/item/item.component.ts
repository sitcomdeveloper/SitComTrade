import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  getnewClients: any;
  Country: any;
  name: any;
  newUserForm: FormGroup;

  constructor(private clientService: ClientsService, private countryService: CountryService, private fb: FormBuilder) { }
  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      country: [''],
      password: [''],
      group: [''],
      countryid: [''],
      currencyname: [''],
      promocode: [''],
      currencyid: [''],
      ownerid: ['']
    }),
      this.getcountryName();
  }
  newClients() {
    const obj = {
      FirstName: this.newUserForm.value.firstname,
      LastName: this.newUserForm.value.lastname,
      Email: this.newUserForm.value.email,
      Phone: this.newUserForm.value.phone,
      CountryName: this.newUserForm.value.country,
      Password: this.newUserForm.value.password,
      CountryId: this.newUserForm.value.countryid,
       CurrencyName : this.newUserForm.value.currencyname,
      Promocode : this.newUserForm.value.promocode,
       CurrencyId: this.newUserForm.value.currencyid,
       OwnerId: this.newUserForm.value.ownerid,
    };
    this.clientService.addnewClients(obj).subscribe(res => {
      this.getnewClients = res;
      console.log('newuser', res);
      this.newUserForm.reset();
    });
  }
  // Get country
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }

}
