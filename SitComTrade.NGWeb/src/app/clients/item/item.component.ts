import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginService } from 'src/app/login/login.service';
import { GroupsService } from 'src/app/settings/groups/groups.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  getnewClients: any;
  Country: any;
  name: any;
  newUserForm: FormGroup;
  acttype = 'Real';
  // bsmodal: BsModalRef;
  sedemailbyuser = false;
  submitted = false;
  title: any;
  btndisable: true;
  response: any;
  getGroupsData: any;
  Group: any;
  getLoginDetails: any;
  bindLoginData: any;
  hiddden = true;
  show = true;

  constructor(private clientService: ClientsService, private bsmodal: BsModalRef,
              private countryService: CountryService, private fb: FormBuilder, private loginservice: LoginService,
              private groupsService: GroupsService) { }
  ngOnInit() {
    this.newUserForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'), Validators.email]],

      phone: ['', [Validators.required]],
      country: ['', [Validators.required]],
      password: ['', [ Validators.minLength(6)]],
      group: [''],
      countryid: [''],
      currencyname: [''],
      // promocode: [''],
      groupid: [''],
      ownerid: [''],
      sendemail: ['']
    }),
      this.getcountryName();
    this.getGroups();
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;
  }
  newClients() {
    if (this.newUserForm.valid) {
      this.Group.forEach(element => {
        if ( element.Id === +this.newUserForm.value.group) {
          this.newUserForm.value.groupid = element.Name;
        }
      });
      this.Country.forEach(element => {
        if ( element.Id === +this.newUserForm.value.country) {
          this.newUserForm.value.countryid = element.Name;
        }
      });
      const obj = {
      FirstName: this.newUserForm.value.firstname,
      LastName: this.newUserForm.value.lastname,
      Email: this.newUserForm.value.email,
      // CountryId: 0,
      GroupName: this.newUserForm.value.groupid,
      AccountType: this.acttype,
      Password: this.newUserForm.value.password,
      CountryName: this.newUserForm.value.countryid,
      GroupId: this.newUserForm.value.group,
      ISendEmail: this.sedemailbyuser,
      OwnerId: this.bindLoginData.UserId,
      Phone: this.newUserForm.value.phone,
      CountryId: this.newUserForm.value.country
    };
      this.clientService.addnewClients(obj).subscribe(res => {
      this.getnewClients = res;
      this.clddata.emit(res);
      if (res === 'null') {
        this.response = '';
      } else {
        this.response = 'Client is added successfully!';
      }
      this.newUserForm.reset();
      // console.log('newuser', res);

    });
    } else {
      this.submitted = true;
    }
  }
  // Get country
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
    });
  }
  // for separtion between account and lead on the select of radio button
  actrealifo(val: any) {
    this.acttype = 'Real';
    if (val === true) {
      this.acttype = 'Real';
    }
    this.show = true;
    this.hiddden = true;

  }
  actrealifo1(val: any) {
    this.acttype = 'Real';
    if (val === true) {
      this.acttype = 'Lead';
    }
    this.show = true;
    this.hiddden = false;
  }
  // for send email
  sendemailuser(val: any) {
if (val === true) {
  this.sedemailbyuser = true;
  const obj = this.newUserForm.value.email;
  this.loginservice.resetPassword(obj).subscribe(res => {
  });
} else {
  this.sedemailbyuser = false;
}
  }
  get f() {
    return this.newUserForm.controls;
  }
  hideModal() {
    this.bsmodal.hide();
  }
  // get all groups
  getGroups() {
    this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result.reverse();
    });
   }
}
