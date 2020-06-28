import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateEditWoorkflowsComponent } from './create-edit-woorkflows/create-edit-woorkflows.component';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

  constructor(private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
  }
  opencrtworkflow() {
    const initialState = {
      title: 'Create Workflow',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateEditWoorkflowsComponent, Object.assign({  show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  //   this.bsModalRef.content.clddata.subscribe(() => {
  //     this.userDetails();
  //   });
  }
}
