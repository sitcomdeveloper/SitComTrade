import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateTemplateComponent } from './create-template/create-template.component';
import { EmailtemplatesService } from './emailtemplates.service';
@Component({
  selector: 'app-emailtemplates',
  templateUrl: './emailtemplates.component.html',
  styleUrls: ['./emailtemplates.component.css']
})
export class EmailtemplatesComponent implements OnInit {
  emailtemplates: any;
  constructor(private modalService: BsModalService, private emailTemplatesService: EmailtemplatesService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.getAllTemplates();
  }
  // get all templates
  getAllTemplates() {
    this.emailTemplatesService.getTemplates().subscribe( res => {
      this.emailtemplates = res;
      console.log('emailtemplates', res);
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
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }
  editPopup() {
    const initialState = {
      title: 'Edit Template',
      edittmplte: 'edittmplte'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTemplateComponent, Object.assign({ show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
