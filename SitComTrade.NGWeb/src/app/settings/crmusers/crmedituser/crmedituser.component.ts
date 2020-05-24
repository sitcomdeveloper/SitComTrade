import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crmedituser',
  templateUrl: './crmedituser.component.html',
  styleUrls: ['./crmedituser.component.css']
})
export class CrmedituserComponent implements OnInit {
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
