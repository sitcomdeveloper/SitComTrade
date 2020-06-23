import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
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
