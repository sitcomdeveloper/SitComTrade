import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-crmnewuser',
  templateUrl: './crmnewuser.component.html',
  styleUrls: ['./crmnewuser.component.css']
})
export class CrmnewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();

  constructor(private bsmodal: BsModalRef) { }

  ngOnInit() {
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
