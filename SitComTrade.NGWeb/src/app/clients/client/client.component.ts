import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ItemComponent } from '../item/item.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';
import { CountryService } from 'src/app/services/country.service';
import { CommentsComponent } from 'src/app/clients_info/comments/comments.component';
import { CreateTaskComponent } from 'src/app/clients_info/tasks-info/create-task/create-task.component';
import { ImportClientComponent } from '../import-client/import-client.component';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import * as $ from 'jquery'
// import { ActcrtaccComponent } from 'src/app/clients-info/actcrtacc/actcrtacc.component';
import { EmailAllComponent } from '../email-all/email-all.component';
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
  assignedselectedrow: any;
  selectedchkbxfrdltclnt = [];
  isActive = false;
  show: boolean;
  colorchanger: any;
  filterdataisstarred: any[];
  allcolorchange: any;
  acccolorchange: any;
  leadcolorchange: any;
  selectedchkbxfrsntmailtoslcted = [];
  chkbxwllsntmailtoclnt: any;
  // tslint:disable-next-line: max-line-length
  constructor(private clientService: ClientsService, private modalService: BsModalService, private router: Router, private spinnerService: Ng4LoadingSpinnerService, private fb: FormBuilder, private _generalinfoservice: GeneralInfoService, private countryService: CountryService,
    private groupsService: GroupsService) { }
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
    this.getAllStatus();
    this.getGroups();
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;

    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
      $("#ckbCheckAll1").click(function () {
        $(".checkBoxClass1").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass1:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
      $("#ckbCheckAll2").click(function () {
        $(".checkBoxClass2").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass2:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
    });

    $(document).ready(function () {
      $("#rotate").on('click', function () {
        $(this).toggleClass('rotate');
      });
    });
  }
  userDetails() {
    this.spinnerService.show();
    setTimeout(() => {
      this.clientService.getUsers(this.bindLoginData.UserId).subscribe(res => {
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
  refresh() {
    this.userDetails();
    this.spinnerService.show();
  }
  userClick(selectedItem: any) {
    // userinfo: 'userinfo';
    this.router.navigate(['/info', selectedItem]);
  }
  // userClick(selectedItem: any,value)
  // userClck(selectedItem: any) {
  //   const url = this.router.serializeUrl(
  //     this.router.createUrlTree(['/info', selectedItem])
  //   );
  //   window.open(url, '_blank');
  // }
  newUser() {
    this.router.navigateByUrl('/user');
  }
  // selectedname: number[]
  deletbtn(val, userid, usermail) {
    this.UserId = userid
    if (val === true) {
      this.deletbtnn = false;
      this.selectedchkbxfrdltclnt.push(userid);
      this.selectedchkbxfrsntmailtoslcted.push(usermail);
      this.chkbxwllsntmailtoclnt = this.selectedchkbxfrsntmailtoslcted.join();
      // console.log('mails', this.chkbxwllsntmailtoclnt);
    } else {
      this.deletbtnn = true;
      this.selectedchkbxfrdltclnt.splice(this.selectedchkbxfrdltclnt.indexOf(userid), 1)
      this.selectedchkbxfrsntmailtoslcted.splice(this.selectedchkbxfrsntmailtoslcted.indexOf(usermail), 1)
    }
  }
  // delete client
  deleteClient() {
    const initialState = {
      title: 'Delete Item',
      userId: this.selectedchkbxfrdltclnt,
      // for div close or hide
      rmvClient: 'rmvClient'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.userDetails();
    });
  }
  // part of add new client modal
  newClient() {
    const initialState = {
      title: 'Create Item',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ItemComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal930', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
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
        this.assignedselectedrow = selectedrow;
        this.clientForm.patchValue({
          status: selectedrow.ResponseStatus,
          group: selectedrow.GroupName,
        });
      }
    });
  }
  // check btn
  saveDetails(selectedId) {
    this.rowData.forEach(selectedrow => {
      if (selectedrow.Id === +selectedId) {
        selectedrow.IsEditable = false;
      }
    });
    const obj = {
      OwnerId: this.assignedselectedrow.OwnerId,
      FirstName: this.assignedselectedrow.FirstName,
      LastName: this.assignedselectedrow.LastName,
      Email: this.assignedselectedrow.Email,
      Phone: this.assignedselectedrow.Phone,
      Mobile: '',
      SecondEmail: '',
      Password: '',
      ResponseStatusId: '',
      ResponseStatus: this.clientForm.value.status,
      CurrencyId: '',
      CurrencyName: '',
      CountryId: '',
      CountryName: this.assignedselectedrow.CountryName,
      DateOfBirth: '',
      FTD: this.assignedselectedrow.FTD,
      FTDDate: '',
      Enabled: '',
      RetentionOwner: '',
      ConvertionOwner: '',
      TypeName: this.assignedselectedrow.TypeName,
      AssignedDate: '',
      FirstRegistrationDate: '',
      ImportId: '',
      GroupName: this.clientForm.value.group,
      GroupId: '',
      Desk: this.assignedselectedrow.Desk,
      RegistrationType: '',
      LastTaskDaysPast: '',
      DaysAgoClientCreated: '',
      ISendEmail: '',
      CitizenshipId: '',
      DeskId: '',
      TypeId: '',
      RegistrationTypeId: '',
      ItemId: this.assignedselectedrow.ItemId,
      Id: selectedId
    };
    this._generalinfoservice.updateClient(obj).subscribe(res => {
      this.updatedDtls = res;
      this.userDetails();
      // console.log('updatedDtls', res);
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
        title: 'Create Task',
        id: rowId,
        // isstaticvalue: 'most'
        infotasks:'infotasks',
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
  // selected checkbox will send email
  sendemail() {
    const initialState = {
      title: 'SEND EMAIL',
      sendemail: 'sendemail',
      // get Id for showing email on popup
      detailss: this.selectedchkbxfrdltclnt,
      listofemails: this.chkbxwllsntmailtoclnt
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(EmailAllComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  // send mai to all popup
  sendmailtoallpopup() {
    const initialState = {
      title: 'SEND EMAIL',
      sendmailtoall: 'sendmailtoall',
      // detailss: this.UserId
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(EmailAllComponent, Object.assign({  show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  // make the client starred
  star(val, staredId) {
    const mkestarred = {
      IsStarred: val,
      ClientId: staredId
    }
    this.clientService.clientStarred(mkestarred).subscribe(starredres => {
      this.colorchanger = starredres;
      this.userDetails();
      // console.log('starred', starredres);
    })
  }
  // All tab data is fltering on the basis of IsStarrable = true. For show those clients whose IsStarrable = true
  allfilterIsStareable(val) {
    if(val === true) {
    this.filterdataisstarred = this.rowData.filter(stareddata => {
      if (stareddata.IsStarred === true) {
        return stareddata;
      }
    });
    this.rowData = this.filterdataisstarred;
    this.UserLength = this.rowData.length;
    this.allcolorchange = true;
  } else {
    this.userDetails();
    this.allcolorchange = false;
  }
  }
  accountsfilterIsStareable(val) {
    if(val === true) {
    this.filterdataisstarred = this.accountInfo.filter(stareddata => {
      if (stareddata.IsStarred === true) {
        return stareddata;
      }
    });
    this.accountInfo = this.filterdataisstarred;
    this.accountLength = this.accountInfo.length;
    this.acccolorchange = true;
  } else {
    this.userDetails();
    this.acccolorchange = false;
  }
  }
  leadsfilterIsStareable(val) {
    if(val === true) {
    this.filterdataisstarred = this.leadInfo.filter(stareddata => {
      if (stareddata.IsStarred === true) {
        return stareddata;
      }
    });
    this.leadInfo = this.filterdataisstarred;
    this.leadLength = this.leadInfo.length;
    this.leadcolorchange = true;
  } else {
    this.userDetails();
    this.leadcolorchange = false;
  }
  }
}

