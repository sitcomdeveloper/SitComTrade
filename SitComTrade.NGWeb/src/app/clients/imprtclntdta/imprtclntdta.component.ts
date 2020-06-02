import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-imprtclntdta',
  templateUrl: './imprtclntdta.component.html',
  styleUrls: ['./imprtclntdta.component.css']
})
export class ImprtclntdtaComponent implements OnInit {
  bsModalRef: BsModalRef;
  title: any;
  constructor(private modalService: BsModalService, private bsmodal: BsModalRef) { }

  ngOnInit() {
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
