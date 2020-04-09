import { Component, OnInit } from '@angular/core';
import { AdditionalInfoService } from './additional-info.service';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  userAdditionalInfo:any;
  constructor(private additionalinfoservice: AdditionalInfoService) { }

  ngOnInit() {
    this.additionalInfo();
  }
  additionalInfo(){
    this.additionalinfoservice.getAdditionalInfo().subscribe(res =>{
      this.userAdditionalInfo = res;
      console.log('additionalinfo',res);
    });
  }

}


