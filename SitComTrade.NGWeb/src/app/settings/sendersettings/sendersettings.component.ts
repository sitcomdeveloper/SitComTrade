import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateSenderSttingsComponent } from './create-sender-sttings/create-sender-sttings.component';

@Component({
  selector: 'app-sendersettings',
  templateUrl: './sendersettings.component.html',
  styleUrls: ['./sendersettings.component.css']
})
export class SendersettingsComponent implements OnInit {
  getSendersData: any;
  
  constructor(private settingsService: SettingsService,private modalService: BsModalService ) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.sendersettingsData();
  }
  sendersettingsData() {
    this.settingsService.getAllSenderSettings().subscribe( result => {
      this.getSendersData = result;
    })
  }
  // create new settings
  opencreatesettings() {
    const initialState = {
      title: 'Create Settings',
      crtemlsttings: 'crtemlsttings'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateSenderSttingsComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.sendersettingsData();
    });
  }
  openeditsettings(wholesendermaildta) {
    const initialState = {
      title: 'Edit Settings',
      edtemlsettngs: 'edtemlsettngs',
      slctedsendermaildta: wholesendermaildta
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateSenderSttingsComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.sendersettingsData();
    });
  }
}
