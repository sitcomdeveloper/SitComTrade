import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.css']
})
export class ImportsComponent implements OnInit {
  imprthistryData: any;
  getLoginDetails: any;
  bindLoginData: any;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;

    this.getHistory();
  }
  //get import history
  getHistory() {
    this.settingsService.getImportHistory(this.bindLoginData.UserId).subscribe(imprthistryRes => {
      this.imprthistryData = imprthistryRes;
      console.log('imprthistryData',imprthistryRes);
    })
  }

}
