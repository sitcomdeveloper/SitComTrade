import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../settings.service';
import { SenderEmailDTO } from '../../settingsDTO';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-create-sender-sttings',
  templateUrl: './create-sender-sttings.component.html',
  styleUrls: ['./create-sender-sttings.component.css']
})
export class CreateSenderSttingsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  createemailsttings = false;
  editemailsettings = false;
  crtemlsttings: any;
  edtemlsettngs: any;
  mkesndremail: SenderEmailDTO;
  newmail: SenderEmailDTO;
  Provider: any;
  SenderEmalForm: FormGroup
  edtsendremail: SenderEmailDTO;
  updatesender: SenderEmailDTO;
  slctedsendermaildta: any;
  constructor(private bsmodal: BsModalRef, private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.SenderEmalForm = this.fb.group({
      sendermail: [],
      description: [],
      providername: [],
      server: [],
      port: [],
      fromemail: [],
      password: [],
      ssl: [],
    })
    if (this.crtemlsttings === 'crtemlsttings') {
      this.createemailsttings = true;
    } else {
      this.createemailsttings = false;
    }
    if (this.edtemlsettngs === 'edtemlsettngs') {
      this.editemailsettings = true;
      this.SenderEmalForm.patchValue({
        sendermail: this.slctedsendermaildta.SenderMailId,
        description: this.slctedsendermaildta.Description,
        providername: this.slctedsendermaildta.ProviderName,
        server: this.slctedsendermaildta.ServerAddress,
      port: this.slctedsendermaildta.PortNo,
      fromemail: this.slctedsendermaildta.FromAddress,
      password: this.slctedsendermaildta.MailPassword,
      ssl: this.slctedsendermaildta.IsShared,

      })
    } else {
      this.editemailsettings = false;
    }
    this.getallProvider();
  }
  // get provider
  getallProvider() {
    this.settingsService.getProvider().subscribe(resprovider => {
      this.Provider = resprovider;
      // console.log('Provider',resprovider);
    })
  }
  // crt senderemail
  createsenderEmail() {
    this.mkesndremail = {
      SenderMailId: this.SenderEmalForm.value.sendermail,
      Description: this.SenderEmalForm.value.description,
      ProviderId: '',
      ProviderName: this.SenderEmalForm.value.providername,
      ServerAddress: '',
      PortNo: '',
      FromAddress: '',
      MailPassword: '',
      Id: '',
      Name: '',
      IsShared: ''
    }
    this.settingsService.crtsendereml(this.mkesndremail).subscribe(getnewsndrmail => {
      this.newmail = getnewsndrmail;
      this.clddata.emit(getnewsndrmail);
      this.bsmodal.hide();
      // console.log('newmail',getnewsndrmail);
    })
  }
  updateSenderEmail() {
    this.edtsendremail = {
      SenderMailId: this.SenderEmalForm.value.sendermail,
      Description: this.SenderEmalForm.value.description,
      ProviderId: '',
      ProviderName: this.SenderEmalForm.value.providername,
      ServerAddress: this.SenderEmalForm.value.server,
      PortNo: this.SenderEmalForm.value.port,
      FromAddress: this.SenderEmalForm.value.fromemail,
      MailPassword: this.SenderEmalForm.value.password,
      Id: this.slctedsendermaildta.Id,
      Name: '',
      IsShared: this.SenderEmalForm.value.ssl
    }
    this.settingsService.updtsenderEmail(this.edtsendremail).subscribe(updtdsndermail => {
      this.updatesender = updtdsndermail;
      this.clddata.emit(updtdsndermail);
      this.bsmodal.hide();
      console.log('updatesender', updtdsndermail);
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
