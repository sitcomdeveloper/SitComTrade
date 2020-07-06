import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { IpDTO } from '../settingsDTO';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-iplist',
  templateUrl: './iplist.component.html',
  styleUrls: ['./iplist.component.css']
})
export class IplistComponent implements OnInit {
  getallIp: any;
  IP: any;
  crtnewIp: IpDTO;
  newip: IpDTO;
  IPForm: FormGroup
  getLoginDetails: any;
  bindLoginData: any;
  constructor(private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.IPForm = this.fb.group({
      ip: [''],
      description: ['']
    })
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    this.getallIPs();
  }
getallIPs() {
  this.settingsService.getIP(this.getallIp).subscribe(fetchIp => {
    this.IP = fetchIp.reverse();
    console.log('IP',fetchIp);
  })
}
// create new ip
createnewIP() {
  this.crtnewIp = {
    Id: '',
    IPAddress: this.IPForm.value.ip,
    Description: this.IPForm.value.description,
    UserId: this.bindLoginData.UserId
  }
this.settingsService.crtIp(this.crtnewIp).subscribe(getnewip => {
  this.newip = getnewip;
  this.IPForm.reset();
  this.getallIPs();
  console.log('newip',getnewip);
})
}
}
