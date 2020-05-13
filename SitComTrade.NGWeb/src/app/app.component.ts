import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cms';

  ngOnInit() {
    this.spinnerService.show();
  }
  constructor(private router: Router, private spinnerService: Ng4LoadingSpinnerService)  {}
// this.spinnerService.show();
}


