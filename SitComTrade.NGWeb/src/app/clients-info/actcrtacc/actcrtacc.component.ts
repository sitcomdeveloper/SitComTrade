import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from 'src/app/settings/settings.service';

@Component({
  selector: 'app-actcrtacc',
  templateUrl: './actcrtacc.component.html',
  styleUrls: ['./actcrtacc.component.css']
})
export class ActcrtaccComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  Group: any;
  getGroupsData: any;
  createaccount: any;
  crtacct = false;
  sendemail: any;
  sndeml = false;
  sndsms = false;
  sendsms: any;
  vwhistory = false;
  viewhistory: any;
  emldetails = false;
  emaildtls: any;
  title: any;
  userGenralinfo: any;
  detailss: any;
  actionsForm: FormGroup;
  getLoginDetails: any;
  bindLoginData: any;
  sentmails: any;
  response: string;
  sntmldta: any;
  tkemail: any;
  gtviewhist: any;
  getSendersData: any;
  constructor(private bsmodal: BsModalRef, private groupsService: GroupsService,private _generalinfoservice: GeneralInfoService,private _route: ActivatedRoute, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    
    if (this.createaccount === 'createaccount') {
      this.crtacct = true;
    } else {
      this.crtacct = false;
    }
    if (this.sendemail === 'sendemail') {
      this.sndeml = true;
      // API of general section use for showing email on actions 'sendemail' popup
     this._generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
      this.userGenralinfo = res;
      this.actionsForm.patchValue({
       to: this.userGenralinfo.Email,
      })
    });
    } else {
      this.sndeml = false;
    }
    if (this.sendsms === 'sendsms') {
      this.sndsms = true;
     // API of general section use for showing phone no. on actions 'sendsms' popup
     this._generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
       this.userGenralinfo = res;
       this.actionsForm.patchValue({
        phone: this.userGenralinfo.Phone,
       
       })
      //  console.log('generalinfop', res)
     });
    } else {
      this.sndsms = false;
    }
    if (this.viewhistory === 'viewhistory') {
      this.vwhistory = true;
      this._generalinfoservice.getviewhistory(this.detailss).subscribe(res => {
        this.gtviewhist = res;
        console.log('gtviewhist',res);
      });
    } else {
      this.vwhistory = false;
    }
    // emaildtls popup on info page
    if (this.emaildtls === 'emaildtls') {
      this.emldetails = true;
      this._generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
        this.userGenralinfo = res;
        this.actionsForm.patchValue({
          to: this.userGenralinfo.Email,
          subject: this.sntmldta.Subject,
      body: this.sntmldta.Body,
         })
      });
    } else {
      this.emldetails = false;
    }
    this.actionsForm = this.fb.group({
      settings: [''],
      to: [''],
      subject: [''],
      body: [''],
      // send sms
      phone: [''],
      message: ['']
    })
    this.getGroups();
    this.sendersettingsData();
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
   // get all mails
  gettheMail() {
    this._generalinfoservice.getMail(this.detailss).subscribe(gtmal => {
      this.tkemail = gtmal;
    })
  }
  //  sendemail
  sendtheemail() {
    const email = {
      To: this.actionsForm.value.to,
      Subject: this.actionsForm.value.subject,
      Body: this.actionsForm.value.body,
      Sender: this.actionsForm.value.settings,
      OwnerId: this.userGenralinfo.Id,
    }
this._generalinfoservice.sendmail(email).subscribe(getmail => {
  this.sentmails = getmail;
  this.gettheMail();
  this.clddata.emit(getmail);
      if (getmail === null) {
        this.response = 'Mail is sent successfully!';
      } else {
        this.response = '';
      }
      this.actionsForm.reset();
})
  }
  sendersettingsData() {
    this.settingsService.getAllSenderSettings().subscribe( result => {
      this.getSendersData = result;
      // console.log('m',result);
    })
  }
  // sendthesms() {

  // }
}
