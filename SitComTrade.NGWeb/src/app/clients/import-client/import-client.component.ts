import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../header/clients/clients.service';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-import-client',
  templateUrl: './import-client.component.html',
  styleUrls: ['./import-client.component.css']
})
export class ImportClientComponent implements OnInit {
  importclientResponse: any;
  
 

  constructor(private router: Router, private clientService: ClientsService) { }

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
      TypeId:1,
      TypeName:'abc',
      Phone:8650689072,
      OwnerName:'shanky',
      ResponseStatus:'success',
      CreatedDate:'21/05/2020',
      CampaignId:1,
      Tag:'abc',
      Tag1:'cde',
      FTD:'sha',
      Group:'a',
      Desk:'com',
      IsEditable:'True'
    };
    this.clientService.importClient(imprtclnt).subscribe(excel => {
      this.importclientResponse = excel;
      console.log('importclientResponse', excel);
    })
  }
  
}
