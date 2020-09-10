import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-monetarytransactions',
  templateUrl: './monetarytransactions.component.html',
  styleUrls: ['./monetarytransactions.component.css']
})
export class MonetarytransactionsComponent implements OnInit {
  MonetryTransactions: any;

  constructor(private router: Router, private activitiesService: ActivitiesService) { }

  ngOnInit() {
    const getmonetrytransactios= {}
    this.activitiesService.getMonetaryTransactions(getmonetrytransactios).subscribe(allmonetrytrnsctions => {
      this.MonetryTransactions = allmonetrytrnsctions;
      // console.log('MonetryTransactions',allmonetrytrnsctions);
    })
  }
  userClick() {
    mnetarytrnsactions: 'mnetarytrnsactions';
    this.router.navigate(['/info', 189]);
  }
}