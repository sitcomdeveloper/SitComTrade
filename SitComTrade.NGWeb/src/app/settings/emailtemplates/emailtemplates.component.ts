import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-emailtemplates',
  templateUrl: './emailtemplates.component.html',
  styleUrls: ['./emailtemplates.component.css']
})
export class EmailtemplatesComponent implements OnInit {
  emailtemplates: any;
  getLoginDetails: any;
  bindLoginData: any;
  constructor(private modalService: BsModalService, private settingsService: SettingsService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    
    this.getAllTemplates();
  }
  // get all templates
  getAllTemplates() {
    this.settingsService.getTemplates(this.bindLoginData.UserId).subscribe( res => {
      this.emailtemplates = res.reverse();
      // console.log('emailtemplates', res);
    });
  }
  newTemplate() {
    const initialState = {
      title: 'Create Template',
      newtmplte: 'newtmplte'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTemplateComponent, Object.assign({ show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getAllTemplates();
    });
  }
  editPopup(wholeemltemplate) {
    const initialState = {
      title: 'Edit Template',
      edittmplte: 'edittmplte',
      slctdemltemplte: wholeemltemplate
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTemplateComponent, Object.assign({ show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getAllTemplates();
    });
  }

}
