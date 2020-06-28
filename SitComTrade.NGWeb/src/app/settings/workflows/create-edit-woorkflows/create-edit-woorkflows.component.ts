import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-edit-woorkflows',
  templateUrl: './create-edit-woorkflows.component.html',
  styleUrls: ['./create-edit-woorkflows.component.css']
})
export class CreateEditWoorkflowsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
