import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-financial-transactions-info',
  templateUrl: './financial-transactions-info.component.html',
  styleUrls: ['./financial-transactions-info.component.css']
})
export class FinancialTransactionsInfoComponent implements OnInit {
  frontGeneralInfo = true;
  financialtransactionInfoForm = FormGroup;
  frontend = true;
  backend = false;
  constructor() { }

  ngOnInit() {
  }

}
