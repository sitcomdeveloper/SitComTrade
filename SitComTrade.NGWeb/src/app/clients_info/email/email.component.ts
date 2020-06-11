import { Component, OnInit } from '@angular/core';
import { ActcrtaccComponent } from 'src/app/clients-info/actcrtacc/actcrtacc.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../general-info/general-info.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  detail: number;
  userGenralinfo: any;

  constructor(private modalService: BsModalService,private _route: ActivatedRoute,private _generalinfoservice:GeneralInfoService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    // For jump to specific clients.see below method "sendData"
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    // API of general section use for showing name of selected client
    // this.spinnerService.show();
    
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
    });
  }
  sendemail(Ide) {
    const initialState = {
      title: 'SEND EMAIL',
      sendemail: 'sendemail',
      // get Id for showing email on popup
      detailss: Ide
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
}
