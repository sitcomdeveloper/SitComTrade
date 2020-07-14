import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  constructor(private fb: FormBuilder, private bsmodal: BsModalRef) { }

  ngOnInit() {
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

}
