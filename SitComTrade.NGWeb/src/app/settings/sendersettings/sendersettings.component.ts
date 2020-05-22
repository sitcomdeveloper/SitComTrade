import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-sendersettings',
  templateUrl: './sendersettings.component.html',
  styleUrls: ['./sendersettings.component.css']
})
export class SendersettingsComponent implements OnInit {
  getSendersData: any;

  constructor(private settingsService: SettingsService ) { }

  ngOnInit() {
    this.sendersettingsData();
  }
  sendersettingsData() {
    this.settingsService.getSenderSettings().subscribe( result => {
      this.getSendersData = result;
      console.log('getSendersData', result);
    })
  }

}
