import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-affilateusers',
  templateUrl: './affilateusers.component.html',
  styleUrls: ['./affilateusers.component.css']
})
export class AffilateusersComponent implements OnInit {
  affiliateUsers: any;
  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.getUsersData();
  }
  // get all afiliate users
  getUsersData() {
    this.settingsService.getAffilateUsers().subscribe(res => {
      this.affiliateUsers = res;
      console.log('affiliateUsers', res);
    });
  }

}
