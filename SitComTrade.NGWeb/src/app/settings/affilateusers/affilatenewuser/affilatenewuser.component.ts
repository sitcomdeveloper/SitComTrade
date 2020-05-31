import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-affilatenewuser',
  templateUrl: './affilatenewuser.component.html',
  styleUrls: ['./affilatenewuser.component.css']
})
export class AffilatenewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  createuser: any;
  addrole: any;
  crtusr = false;
  adrole = false;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
    if(this.createuser === 'createuser') {
      this.crtusr = true;
    } else {
      this.crtusr = false;
    }
    if(this.addrole === 'addrole') {
      this.adrole = true;
    } else {
      this.adrole = false;
    }
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
