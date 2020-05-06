import { Component, OnInit } from '@angular/core';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateTemplateComponent } from './create-template/create-template.component';
@Component({
  selector: 'app-emailtemplates',
  templateUrl: './emailtemplates.component.html',
  styleUrls: ['./emailtemplates.component.css']
})
export class EmailtemplatesComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
  }
  newTemplate() {
    const initialState = {
      title: 'Create Item',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTemplateComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
