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
import { CommentsComponent } from 'src/app/clients_info/comments/comments.component';
import { CreateTaskComponent } from 'src/app/clients_info/tasks-info/create-task/create-task.component';
import { ImportClientComponent } from '../import-client/import-client.component';
import { GroupsService } from 'src/app/settings/groups/groups.service';

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
  activeTab = 'all';
  Editable: boolean;
  countValue: any[];
  countLength: number;
  comments: any;
  Status: any;
  Group: any;
  getGroupsData: any;
  assignselectedrow: any;
  // tslint:disable-next-line: max-line-length
  constructor(private clientService: ClientsService, private modalService: BsModalService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private route: ActivatedRoute,
    private fb: FormBuilder, private _generalinfoservice: GeneralInfoService, private countryService: CountryService,
    private groupsService: GroupsService) { }
  bsModalRef: BsModalRef;
  // private bsmodal: BsModalRef
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
    this.getAllStatus();
    this.getGroups();
    // code for receiving login details and bind OwnerName at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;

  }
  userDetails() {
    // this.clientInfo
    // this.bindLoginData.Id
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    this.spinnerService.show();
    setTimeout(() => {
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
    });
  }
  userClick(selectedItem: any) {
    this.router.navigate(['/info', selectedItem]);
    // const url = this.router.serializeUrl(
    //   this.router.createUrlTree(['/info', selectedItem])
    // );
    // window.open(url, '_blank');
  }
  // userClck(selectedItem: any) {
  //   const url = this.router.serializeUrl(
  //     this.router.createUrlTree(['/info', selectedItem])
  //   );
  //   window.open(url, '_blank');
  // }
  newUser() {
    this.router.navigateByUrl('/user');
  }
  // checked count implemantation
  //   deletbtn(val, userid) {
  //     this.UserId = userid;
  //     if (val === true) {
  // this.rowData.forEach(element =>  {
  // if  (userid === element.Id) {
  // element.IsEditable = true;
  // this.countValue = this.rowData.filter(checkedCount => {
  //   if (checkedCount.IsEditable === true) {
  //     return checkedCount;
  // }
  // });
  // this.deletbtnn = false;
  // this.countLength = this.countValue.length;
  // }
  // });
  // } else {this.rowData.forEach(element =>  {
  //   if  (userid === element.Id) {
  //   element.IsEditable = false;
  //   this.countValue = this.rowData.filter(checkedCount => {
  //     if (checkedCount.IsEditable === true) {
  //       return checkedCount;
  // }
  // });
  //   this.deletbtnn = true;

  //   this.countLength = this.countValue.length;
  //   }
  //   });
  // }

  //   }
  deletbtn(val, userid) {
    this.UserId = userid;
    if (val === true) {
      this.deletbtnn = false;
    } else {
      this.deletbtnn = true;
    }
  }
  // part of add new client modal
  newClient() {
    const initialState = {
      title: 'Create Item',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.userDetails();

    });
  }
  // delete client
  deleteClient() {
    const initialState = {
      title: 'Delete Item',
      userId: this.UserId,
      // for div close or hide
      rmvClient: 'rmvClient'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal450', initialState }));
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
    this.rowData.forEach(selectedrow => {
      if (selectedrow.Id === +selectedId) {
        selectedrow.IsEditable = true;
        this.Editable = selectedrow.IsEditable;
        this.assignselectedrow = selectedrow;
        this.clientForm.patchValue({
          //     id: t.Id,
          //     firstname: t.FirstName,
          //     lastname: t.LastName,
          //     countryname: t.CountryName,
          //     email: t.Email,
          //     type: t.TypeName,
          //     phone: t.Phone,
          // owner: t.OwnerName,
          status: selectedrow.ResponseStatus,
          // createddate: t.CreatedDate,
          // campaignid: t.CampaignId,
          // tag: t.Tag,
          // tag1: t.Tag1,
          // ftd: t.FTD,
          group: selectedrow.GroupName,
          // desk: t.Desk
        });
        // }
        // });
      }
    });
    console.log(selectedId);

  }
  // check btn
  saveDetails(selectedId) {
    this.rowData.forEach(selectedrow => {
      if (selectedrow.Id === +selectedId) {
        selectedrow.IsEditable = false;
      }
    });
    const obj = {
      OwnerId: '',
      FirstName: '',
      LastName: '',
      Email: '',
      Phone: '',
      Mobile: '',
      SecondEmail: '',
      Password: '',
      ResponseStatusId: '',
      ResponseStatus: this.clientForm.value.status,
      CurrencyId: '',
      CurrencyName: '',
      CountryId: '',
      CountryName: '',
      DateOfBirth: '',
      FTD: '',
      FTDDate: '',
      Enabled: '',
      RetentionOwner: '',
      ConvertionOwner: '',
      TypeName: '',
      AssignedDate: '',
      FirstRegistrationDate: '',
      ImportId: '',
      GroupName: this.clientForm.value.group,
      GroupId: '',
      Desk: '',
      RegistrationType: '',
      LastTaskDaysPast: '',
      DaysAgoClientCreated: '',
      ISendEmail: '',
      CitizenshipId: '',
      DeskId: '',
      TypeId: '',
      RegistrationTypeId: '',
      ItemId: ''
    };
    this._generalinfoservice.updateClient(obj).subscribe(res => {
      this.updatedDtls = res;
      console.log('updatedDtls', res);
      this.spinnerService.show();

    });
  }
  // cancel
  closeEditableMode(selectedId) {
    this.rowData.forEach(selectedrow => {
      if (selectedrow.Id === +selectedId) {
        selectedrow.IsEditable = false;
      }
    });

  }
  // get country
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
    });
  }
  // for making the tab change
  act(activeTab) {
    this.activeTab = activeTab;
    this.spinnerService.show();
    this.userDetails();
  }
  // by clicking on 3 dots open comment componet
  openCommentsComponent(rowId) {
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-lg',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      initialState: {
        moreIdInfo: rowId,
        iscustomevalue: 'more',
        addcommentsby3Dots: 'add'
      }
    };
    this.bsModalRef = this.modalService.show(CommentsComponent, config);
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  openTasksinfoComponent(rowId) {
    const config: ModalOptions = {
      backdrop: 'static',
      class: 'modal-lg',
      keyboard: false,
      animated: true,
      ignoreBackdropClick: true,
      initialState: {
        moreId: rowId,
        isstaticvalue: 'most'

      }
    };
    this.bsModalRef = this.modalService.show(CreateTaskComponent, config);
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  // import client
  openImprtClient() {
    const initialState = {
      title: 'Import Clients',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ImportClientComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsmodal.hide();
    // this.bsModalRef.content.clddata.subscribe(data => {
    // this.userDetails();
    // });
  }
  // groups-info
  getGeneralInfo(setItem: any) {
    //  this.router.navigate(['/groups-info', setItem]);
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/groups-info', setItem])
    );
    window.open(url, '_blank');
  }
  // get status
  getAllStatus() {
    this._generalinfoservice.getStatus().subscribe(response => {
      this.Status = response;
    });
  }
  // get all groups
  getGroups() {
    this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result.reverse();
    });
  }
}
