import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  constructor(private http: HttpClient) { }
  // get all translations
  getTranslations(): Observable<any> {
    return this.http.get<any>('assets/translations.json');
  }
}
