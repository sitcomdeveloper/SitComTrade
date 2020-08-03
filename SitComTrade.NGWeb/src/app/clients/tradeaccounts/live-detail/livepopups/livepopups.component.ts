import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-livepopups',
  templateUrl: './livepopups.component.html',
  styleUrls: ['./livepopups.component.css']
})
export class LivepopupsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  dpst = false;
  wihdrw  = false;
  crdtin  = false;
  crdtot  = false;
  deposit: string;
  withdraw: string;
  creditin: string;
  creditout: string;
  title: any;
  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
    if(this.deposit === 'deposit') {
      this.dpst = true;
    } else {
      this.dpst = false;
    }
    if(this.withdraw === 'withdraw') {
      this.wihdrw = true;
    } else {
      this.wihdrw = false;
    }
    if(this.creditin === 'creditin') {
      this.crdtin = true;
    } else {
      this.crdtin = false;
    }
    if(this.creditout === 'creditout') {
      this.crdtot = true;
    } else {
      this.crdtot = false;
    }
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
