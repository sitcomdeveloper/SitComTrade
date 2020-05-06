import { Component, OnInit } from '@angular/core';
import { TranslationsService } from './translations.service';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TranslationsFilterComponent } from './translations-filter/translations-filter.component';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {
  translations: any;
  constructor(private translationsService: TranslationsService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.getTranslationsData();
  }
  // get translations data
  getTranslationsData() {
    this.translationsService.getTranslations().subscribe( res => {
      this.translations = res;
      console.log('translations', res);
    });
  }
  // for filter by click on + icon
  translationsFilter() {
    const initialState = {
      title: 'Create Filter',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(TranslationsFilterComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.userDetails();

    // });
  }

}
