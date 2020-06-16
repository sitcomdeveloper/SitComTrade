import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { GeneralInfoService } from 'src/app/clients_info/general-info/general-info.service';

@Component({
  selector: 'app-email-all',
  templateUrl: './email-all.component.html',
  styleUrls: ['./email-all.component.css']
})
export class EmailAllComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  actionsForm: FormGroup;
  getLoginDetails: any;
  bindLoginData: any;
  mailtooall: any;
  userGenralinfo: any;
  detailss: number;
  response: string;
  sendmailtoall: any;
  sndmailtoallclients = false;
  sendemail: any;
  sndeml = false;
  sentmails: any;
  title: any;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private clientsservice: ClientsService, private generalinfoservice:GeneralInfoService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('lndtls',this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;

      // snd mail to all
      if (this.sendmailtoall === 'sendmailtoall') {
        this.sndmailtoallclients = true;
        // API of general section use for showing email on actions 'sendemail' popup
       this.generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
        this.userGenralinfo = res;
        this.actionsForm.patchValue({
         to: this.userGenralinfo.Email,
        })
        console.log('generalinfop', res)
      });
      } else {
        this.sndmailtoallclients = false;
      }
      // snd mail to selected clients
      if (this.sendemail === 'sendemail') {
        this.sndeml = true;
        // API of general section use for showing email on actions 'sendemail' popup
       this.generalinfoservice.getUsersInfo(this.detailss).subscribe(res => {
        this.userGenralinfo = res;
        this.actionsForm.patchValue({
         to: this.userGenralinfo.Email,
        })
        console.log('generalinfop', res)
      });
      } else {
        this.sndeml = false;
      }

    this.actionsForm = this.fb.group({
      settings: [''],
      to: [''],
      subject: [''],
      body: ['']
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }
  // sendmail to all
  sendmailltoall() {
    const sentall = {
      To: this.actionsForm.value.to,
      Subject: this.actionsForm.value.subject,
      Body: this.actionsForm.value.body,
      Sender: this.actionsForm.value.settings,
      OwnerId: this.userGenralinfo.Id,
      UserId: this.bindLoginData.UserId,
    }
    this.clientsservice.mailsenttoALLClients(sentall).subscribe(senttoall => {
      this.mailtooall = senttoall;
      this.clddata.emit(senttoall);
      if (senttoall === true) {
        this.response = 'Mail is sent to all successfully!';
      } else {
        this.response = '';
      }
      this.actionsForm.reset();
      console.log('mailtooall',senttoall);
    })
  }
  // mail to selected
  sendtheemail() {
    const email = {
      To: this.actionsForm.value.to,
      Subject: this.actionsForm.value.subject,
      Body: this.actionsForm.value.body,
      Sender: this.actionsForm.value.settings,
      OwnerId: this.userGenralinfo.Id,
    }
this.generalinfoservice.sendmail(email).subscribe(getmail => {
  this.sentmails = getmail;
  this.clddata.emit(getmail);
      if (getmail === null) {
        this.response = 'Mail is sent successfully!';
      } else {
        this.response = '';
      }
      this.actionsForm.reset();
})
  }
}
