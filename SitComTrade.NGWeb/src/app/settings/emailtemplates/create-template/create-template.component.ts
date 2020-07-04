import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder) { }

  ngOnInit() {
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
    } else {
      this.edittemplate = false;
    }
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
