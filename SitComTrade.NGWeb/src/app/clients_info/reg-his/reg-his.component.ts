import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
import { ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../general-info/general-info.service';
@Component({
  selector: 'app-reg-his',
  templateUrl: './reg-his.component.html',
  styleUrls: ['./reg-his.component.css']
})
export class RegHisComponent implements OnInit {
  userGenralinfo: any;

  constructor(private route: ActivatedRoute, private generalinfoservice: GeneralInfoService) { }

  ngOnInit() {
 $(document).ready(function () {
    $("#reg").click(function () {
      $(".showrcrdreg").toggle();
    });
  });
   // receiving data from client page for general-info
   const details = +this.route.snapshot.paramMap.get('selectedItem');
   this.generalinfoservice.getregHistory(details).subscribe(res => {
     this.userGenralinfo = res;
})
  }
}
