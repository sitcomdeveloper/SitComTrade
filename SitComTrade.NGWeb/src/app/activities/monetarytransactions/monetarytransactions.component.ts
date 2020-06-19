import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monetarytransactions',
  templateUrl: './monetarytransactions.component.html',
  styleUrls: ['./monetarytransactions.component.css']
})
export class MonetarytransactionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  userClick() {
    mnetarytrnsactions: 'mnetarytrnsactions';
    this.router.navigate(['/info', 189]);
  }

}
