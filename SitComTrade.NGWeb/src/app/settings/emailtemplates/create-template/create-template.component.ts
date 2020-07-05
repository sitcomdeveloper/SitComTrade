import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { EmailTemplatesDTO } from '../../settingsDTO';
@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.css']
})
export class CreateTemplateComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  createtemplate = false;
  edittemplate = false;
  newtmplte: any;
  edittmplte: any;
  EmailTemplateForm: FormGroup
  getLoginDetails: any;
  bindLoginData: any;
  addtmplte: EmailTemplatesDTO;
  slctdemltemplte: any;
  newemailtmplte: EmailTemplatesDTO;
  updatetemplate: EmailTemplatesDTO;
  updtedtemplte: EmailTemplatesDTO;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;
     
    this.EmailTemplateForm = this.fb.group({
      name: [],
      subject: [],
      systemtemplate: [],
      public: [],
      template: [],
    })
    if(this.newtmplte === 'newtmplte') {
      this.createtemplate = true;
    } else {
      this.createtemplate = false;
    }
    if(this.edittmplte === 'edittmplte') {
      this.edittemplate = true;
      this.EmailTemplateForm.patchValue({
        name: this.slctdemltemplte.Name,
      subject: this.slctdemltemplte.Subject,
      systemtemplate: this.slctdemltemplte.IsSysTemplate,
      public: this.slctdemltemplte.IsPublic,
      template: this.slctdemltemplte.Template,
      })
    } else {
      this.edittemplate = false;
    }
  }
  // crt templlate
  newemailTemplate() {
    this.newemailtmplte = {
      Id: '',
      Name: this.EmailTemplateForm.value.name,
      Subject: this.EmailTemplateForm.value.subject,
      IsSysTemplate: this.EmailTemplateForm.value.systemtemplate,
      IsPublic: this.EmailTemplateForm.value.public,
      Template: this.EmailTemplateForm.value.template,
      UserId: this.bindLoginData.UserId,
    }
    this.settingsService.crtemailTemplate(this.newemailtmplte).subscribe(getnewtemplte => {
      this.addtmplte = getnewtemplte;
      this.clddata.emit(getnewtemplte);
      this.bsmodal.hide();
      console.log('addtmplte',getnewtemplte);
    })
  }
  //  edt template
  edttemplate() {
    this.updatetemplate = {
      Id: this.slctdemltemplte.Id,
      Name: this.EmailTemplateForm.value.name,
      Subject: this.EmailTemplateForm.value.subject,
      IsSysTemplate: this.EmailTemplateForm.value.systemtemplate,
      IsPublic: this.EmailTemplateForm.value.public,
      Template: this.EmailTemplateForm.value.template,
      UserId: this.slctdemltemplte.UserId,
    }
    this.settingsService.updtemailTemplte(this.updatetemplate).subscribe(getupdttemplte => {
      this.updtedtemplte = getupdttemplte;
      this.clddata.emit(getupdttemplte);
      this.bsmodal.hide();
      console.log('updtedtemplte',getupdttemplte);
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
