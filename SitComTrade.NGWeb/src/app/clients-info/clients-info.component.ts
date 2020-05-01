import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../clients_info/general-info/general-info.service';
import { ClientsService } from '../header/clients/clients.service';


@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {
  userid: any;
  Apptitle: any;
  userGenralinfo: any;
  details: any;
  clientInfo: any;
  rowData: any
  constructor(private router: Router, private _generalinfoservice: GeneralInfoService, private _route: ActivatedRoute,
     private clientService: ClientsService ) { }

  ngOnInit() {
    // this.userid = '1';
    // this.Apptitle = JSON.parse(localStorage.getItem('project'));
    // console.log('getclientdata', this.Apptitle);
    // this.userGenralinfo = this.Apptitle;

    const details = +this._route.snapshot.paramMap.get('selectedItem');
    console.log(details);
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
      console.log('generalinfo', res);
    });
    this.userDetails();
  }
  // get all 'clientdetailbyownerId/1' for jump to clients
  userDetails() {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res.reverse();
        console.log('res',res);
      }
    });
 
  }
  
}

