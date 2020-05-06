import { Component, OnInit } from '@angular/core';
import { TranslationsService } from './translations.service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.css']
})
export class TranslationsComponent implements OnInit {
  translations: any;
  constructor(private translationsService: TranslationsService) { }

  ngOnInit() {
  }
  // get translations data
  getTranslationsData() {
    this.translationsService.getTranslations().subscribe( res => {
      this.translations = res;
      console.log('translations', res);
    });
  }

}
