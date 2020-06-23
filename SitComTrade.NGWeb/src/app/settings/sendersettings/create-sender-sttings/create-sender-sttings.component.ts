import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-create-sender-sttings',
  templateUrl: './create-sender-sttings.component.html',
  styleUrls: ['./create-sender-sttings.component.css']
})
export class CreateSenderSttingsComponent implements OnInit {
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
