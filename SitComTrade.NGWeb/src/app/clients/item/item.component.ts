import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  acttype = 'Real';
  sedemailbyuser = false;
  submitted = false;

  constructor(private clientService: ClientsService, private countryService: CountryService, private fb: FormBuilder) { }
  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.email]],

      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      group: ['', Validators.required],
      countryid: [''],
      currencyname: [''],
      // promocode: [''],
      // currencyid: [''],
      ownerid: [''],
      sendemail: ['']
    }),
      this.getcountryName();
  }
  newClients() {
    const obj = {
      FirstName: this.newUserForm.value.firstname,
      LastName: this.newUserForm.value.lastname,
      Email: this.newUserForm.value.email,
      // CountryId: 0,
      GroupName: this.newUserForm.value.group,
      AccountType: this.acttype,
      Password: this.newUserForm.value.password,
      CountryName: this.newUserForm.value.country,
      GroupId: this.newUserForm.value.group,
      ISendEmail: this.sedemailbyuser,
      OwnerId: 1,
      Phone: this.newUserForm.value.phone,
      CountryId: this.newUserForm.value.countryid,
      //  CurrencyName : this.newUserForm.value.currencyname,
      // Promocode : this.newUserForm.value.promocode,
      //  CurrencyId: this.newUserForm.value.currencyid,
      //  OwnerId: this.newUserForm.value.ownerid,

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
  // for separtion between account and lead on the select of radio button
  actrealifo(val: any) {
    this.acttype = 'Real';
    if (val === true) {
      this.acttype = 'Real';
    }
  }
  actrealifo1(val: any) {
    this.acttype = 'Real';
    if (val === true) {
      this.acttype = 'Lead';
    }
  }
  // for send email
  sendemailuser(val: any) {
if (val === true) {
  this.sedemailbyuser = true;
} else {
  this.sedemailbyuser = false;
}
  }
  onSubmit() {
    this.submitted = true;
    if (this.newUserForm.invalid) {
      return;
    }
  }
  get f() {
    return this.newUserForm.controls;
  }
}
