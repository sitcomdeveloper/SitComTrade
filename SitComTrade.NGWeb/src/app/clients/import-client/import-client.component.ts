import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-import-client',
  templateUrl: './import-client.component.html',
  styleUrls: ['./import-client.component.css']
})
export class ImportClientComponent implements OnInit {
  
 

  constructor(private router: Router) { }

  ngOnInit() {
  }
  
}
