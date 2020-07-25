import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ClientsService } from 'src/app/header/clients/clients.service';
@Component({
  selector: 'app-sms-all',
  templateUrl: './sms-all.component.html',
  styleUrls: ['./sms-all.component.css']
})
export class SmsAllComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  actionsForm: FormGroup;
  sendsmstoall: any;
  sndsmstoall = false
  sndsmstoSelected = false;
  sendsmstoselected: any;
  title: any;
  response: String;
  SMStoall: any;
  getLoginDetails: any;
  bindLoginData: any;
  SMStoselected: any;
  detailss: number;
  listofphone: any;
  constructor(private fb: FormBuilder, private bsmodal: BsModalRef, private clientsService: ClientsService) { }

  ngOnInit() {
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    
    // snd sms to all
    if(this.sendsmstoall === 'sendsmstoall') {
      this.sndsmstoall = true;
    } else
    {
      this.sndsmstoall = false;
    }
    // sns sms to selcted
    if(this.sendsmstoselected === 'sendsmstoselected') {
      this.sndsmstoSelected = true;
    } else
    {
      this.sndsmstoSelected = false;
    }
    this.actionsForm = this.fb.group({
      message: ['']
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }
//  send sms to all
sendsmstotheall() {
  const sndsmsall = {
    OwnerId: '',
MessageText: this.actionsForm.value.message,
PhoneNumber: '',
UserId: this.bindLoginData.UserId
  }
this.clientsService.sendsmstoall(sndsmsall).subscribe(sendsmsall => {
  this.SMStoall = sendsmsall;
  this.clddata.emit(sendsmsall);
  if (sendsmsall === '') {
    this.response = '';
  } else {
    this.response = 'SMS is sent successfully!';
  }
  console.log('SMStoall',sendsmsall);
  this.actionsForm.reset();
})
}
// send sms to selected
sendsmstotheSelected() {
  const sndsmstoSelected = {
    PhoneNumber: this.listofphone,
    MessageText: this.actionsForm.value.message,           
    OwnerId: '',
    UserId: this.bindLoginData.UserId,
  }
  this.clientsService.sendsmstoselctd(sndsmstoSelected).subscribe(sendsmsselected => {
    this.SMStoselected = sendsmsselected;
    this.clddata.emit(sendsmsselected);
    if (sendsmsselected === '') {
      this.response = '';
    } else {
      this.response = 'SMS is sent successfully!';
    }
     console.log('SMStoslcted',sendsmsselected);
     this.actionsForm.reset();
  })
}
// this.detailss
}
