import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { LoginService } from 'src/app/login/login.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private clientService: ClientsService, private loginService: LoginService, private fb: FormBuilder) { }
  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      phone: [''],
      country: [''],
      password: [''],
      group: ['']
    }),
      this.getcountryName();
  }
  newClients() {
    let obj = {
      FirstName: this.newUserForm.value.firstname,
      LastName: this.newUserForm.value.lastname,
      Email: this.newUserForm.value.email,
      Phone: this.newUserForm.value.phone,
      CountryName: this.newUserForm.value.country,
      Password: this.newUserForm.value.password,
      // CountryId: this.newUserForm.value.,
      //  CurrencyName :this.newUserForm.value.,
      // Promocode :this.newUserForm.value.,  
      //  CurrencyId: this.newUserForm.value.,
      //  OwnerId: this.newUserForm.value.',
    }
    this.clientService.addnewClients(obj).subscribe(res => {
      this.getnewClients = res;
      console.log('newuser', res);
      this.newUserForm.reset();
    })
  }
  // Get country
  getcountryName() {
    this.loginService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }

}
