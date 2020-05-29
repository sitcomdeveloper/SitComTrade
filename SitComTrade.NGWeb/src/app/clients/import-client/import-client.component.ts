import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../header/clients/clients.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImportClientDataComponent } from '../import-client-data/import-client-data.component';

@Component({
  selector: 'app-import-client',
  templateUrl: './import-client.component.html',
  styleUrls: ['./import-client.component.css']
})
export class ImportClientComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  importclientResponse: any;
  closefirstpopup = true;



  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private clientService: ClientsService, private bsmodal: BsModalRef, private modalService: BsModalService) { }
    bsModalRef: BsModalRef;

  ngOnInit() {
  }
  importclientbyExcel() {
    const imprtclnt = {
      Id: '',
      ItemId: 'TRA00',
      FirstName: 'Shanky',
      LastName: 'Pal',
      CountryId: 1,
      CountryName: 'Agra',
      Email: 'shaky8615@gmail.com',
      TypeId: 1,
      TypeName: 'abc',
      Phone: 8650689072,
      OwnerName: 'shanky',
      ResponseStatus: 'success',
      CreatedDate: '21/05/2020',
      CampaignId: 1,
      Tag: 'abc',
      Tag1: 'cde',
      FTD: 'sha',
      Group: 'a',
      Desk: 'com',
      IsEditable: 'True'
    };
    this.clientService.importClient(imprtclnt).subscribe(excel => {
      this.importclientResponse = excel;
      console.log('importclientResponse', excel);
    });
  }
  opennextpopup() {
    const initialState = {
      title: 'Import Clients',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ImportClientDataComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsmodal.hide();
    this.closefirstpopup = false;
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
