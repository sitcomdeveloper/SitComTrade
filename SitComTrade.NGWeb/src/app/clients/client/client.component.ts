import { Component, OnInit, EventEmitter } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ItemComponent } from '../item/item.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  updatedDtls: any;
  getLoginDetails: any;
  rowData = [];
  deletbtnn = true;
  showMsg: any;
  accountInfo: any[];
  leadInfo: any[];
  clientInfo: any[];
a: any;
UserId: any;
UserLength: any;
accountLength: any;
leadLength: any;
Id: any;
msg: string;
pageSize: any;
changePageSize: any;
all = true;
accounts = false;
leads = false;
clientForm: FormGroup;
bindLoginData: any;
  name: any;
  Country: any;
// tslint:disable-next-line: max-line-length
  constructor(private clientService: ClientsService, private modalService: BsModalService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,
              private fb: FormBuilder, private _generalinfoservice: GeneralInfoService, private countryService: CountryService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.clientForm = this.fb.group({
      id: [''],
      firstname: [''],
      lastname: [''],
      countryname: [''],
      email: [''],
      type: [''],
      phone: [''],
      owner: [''],
      status: [''],
      createddate: [''],
      campaignid: [''],
      tag: [''],
      tag1: [''],
      ftd: [''],
      group: [''],
      desk: [''],
      countryid: ['']
    });
    this.userDetails();
    this.getcountryName();
  }
  userDetails() {
    // this.bindLoginData.Id
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    this.spinnerService.show();
    setTimeout( () => {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res.reverse();
        this.UserLength = res.length;
        this.spinnerService.hide();
        this.accountInfo = this.rowData.filter(m => {
          if (m.TypeName === 'Real') {
            return m;
          }
        });
        this.accountLength = this.accountInfo.length;
        console.log('new', this.accountInfo.length);
        this.leadInfo = this.rowData.filter(p => {
          if (p.TypeName === 'Lead') {
            return p;
          }
        });
        this.leadLength = this.leadInfo.length;
      }
    });
  }, );
  }
  userClick(selectedItem: any) {
    // let userid = selectedItem;
    // localStorage.clear();
    // localStorage.setItem('project', JSON.stringify(selectedItem));
    // console.log('selecteditem', JSON.stringify(selectedItem));
    // this.router.navigateByUrl('/info');
    // console.log('Selected item Id: ', selectedItem.ItemId);
    console.log(selectedItem);
    this.router.navigate(['/info', selectedItem]);

  }
  newUser() {
    this.router.navigateByUrl('/user');
  }
  importClients() {
    this.router.navigateByUrl('/importclients');
  }
  deletbtn(val, userid) {
    this.UserId = userid;
    const count = 1;
    if (val === true) {
    this.a = count + 1;
    this.showMsg = 'items checked from';
    this.deletbtnn = false;
} else {
  // tslint:disable-next-line: no-shadowed-variable
  let count = 1;
  this.a = count--;
  this.showMsg = '';
  this.deletbtnn = true;
}

  }
  // part of add new client modal
  newClient() {
    const initialState = {
      title: 'Create Item',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.userDetails();

    });
  }
  // delete client
  deleteClient(userid) {
    const initialState = {
      title: 'Delete Item',
      userId: this.UserId,
      // for div close or hide
      rmvClient: 'rmvClient'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.userDetails();
    });
  }
  alll() {
    this.all = true;
    this.accounts = false;
    this.leads = false;
  }
  account() {
    this.all = false;
    this.accounts = true;
    this.leads = false;
  }
  lead() {
    this.all = false;
    this.accounts = false;
    this.leads = true;
  }
  // pencil
  openEditableMode(selectedId) {
    this.rowData.forEach( t => {
      if (t.Id === +selectedId ) {
  t.IsEditable = true;
  this.clientForm.patchValue({
          id: t.Id,
          firstname: t.FirstName,
          lastname: t.LastName,
          countryname: t.CountryName,
          email: t.Email,
          type: t.TypeName,
          phone: t.Phone,
      owner: t.OwnerName,
      status: t.ResponseStatus,
      createddate: t.CreatedDate,
      campaignid: t.CampaignId,
      tag: t.Tag,
      tag1: t.Tag1,
      ftd: t.FTD,
      group: t.Group,
      desk: t.Desk
        });
    // }
  // });
}
});
    console.log(selectedId);

  }
  // check btn
  saveDetails(selectedId) {
    this.rowData.forEach( t => {
      if (t.Id === +selectedId ) {
  t.IsEditable = false;
}
});
//     const obj = {
//   Id: t.Id,
//   FirstName: t.clientForm.value.firstname,
//   LastName: t.clientForm.value.lastname,
//   Email: t.clientForm.value.email,
//   GroupName: t.clientForm.value.group,
//   TypeName: t.clientForm.value.type,
//   Password: t.clientForm.value.Password,
//   CountryName: t.clientForm.value.countryname,
//   CountryId: t.countryid,
//   GroupId: t.Group,
//   ISendEmail: t.ISendEmail,
//   OwnerId: t.OwnerName,
//   Phone: t.phone,
// };
  //   this._generalinfoservice.updateClient(obj).subscribe(res => {
  // this.updatedDtls = res;
  // console.log('updatedDtls', res);
  // this.spinnerService.show();

// });
  }
  // cancel
  closeEditableMode(selectedId) {
    this.rowData.forEach( t => {
      if (t.Id === +selectedId ) {
        t.IsEditable = false;
}
});

  }
  // get country
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
    });
  }

}
