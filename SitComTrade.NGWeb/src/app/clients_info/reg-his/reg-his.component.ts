import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery' 
@Component({
  selector: 'app-reg-his',
  templateUrl: './reg-his.component.html',
  styleUrls: ['./reg-his.component.css']
})
export class RegHisComponent implements OnInit {

  constructor() { }

  ngOnInit() {
 
  $(document).ready(function () {
    $("#reg").click(function () {
      $(".showrcrdreg").toggle();
    });
  });
}
}
