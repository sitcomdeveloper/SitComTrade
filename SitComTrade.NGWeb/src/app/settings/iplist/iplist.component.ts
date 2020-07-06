import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-iplist',
  templateUrl: './iplist.component.html',
  styleUrls: ['./iplist.component.css']
})
export class IplistComponent implements OnInit {
  getallIp: any;
  IP: any;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.getallIPs();
  }
getallIPs() {
  this.settingsService.getIP(this.getallIp).subscribe(fetchIp => {
    this.IP = fetchIp;
    console.log('IP',fetchIp);
  })
}
}
