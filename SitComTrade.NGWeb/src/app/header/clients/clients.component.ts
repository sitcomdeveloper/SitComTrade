import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})

export class ClientsComponent implements OnInit {
  columnDefs = [
    {headerName:'Id',field:'Id',headerHeight:'50',autoHeight:true,rowHeight:50},
    {headerName: 'FirstName', field: 'FirstName',autoHeight:true},
    {headerName: 'LastName', field: 'LastName'},
    {headerName: 'Country', field: 'Country'},
    {headerName:'Email',field:'Email'},
    {headerName:'Type',field:'Type'},
    {headerName: 'Phone', field: 'Phone'},
    {headerName:'Owner',field:'Owner'},
    {headerName:'Status',field:'Status'},
    {headerName:'Created Date',field:'Created Date'},
    {headerName:'Campaign Id',field:'Campaign Id'},
    {headerName:'Tag',field:'Tag'},
    {headerName:'Tag1',field:'Tag1'},
    {headerName:'FTD',field:'FTD'},
    {headerName:'Group',field:'Group'},
    {headerName:'Desk',field:'Desk'},
];


rowData = [
    // {make: 'Toyota', model: 'Celica', price: 35000},
    // {make: 'Ford', model: 'Mondeo', price: 32000},
    // {make: 'Porsche', model: 'Boxter', price: 72000}
];

  constructor() { }

  ngOnInit() {
    // fetch('https://api.myjson.com/bins/15psn9')
    //  fetch('http://localhost:59122/api/User/UserList')
    fetch('https://ba0e228e.ngrok.io/api/User/UserList')
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  }

}

// {headerName: 'Item ID', field: 'ID'},
//     {headerName: 'First Name', field: 'FN'},
//     {headerName: 'Last Name', field: 'LN',editable:true},
//     {headerName:'Country',field:'country'},
//     {headerName:'Email',field:'email'},
//     {headerName:'Type',field:'type'},
//     {headerName:'Phone',field:'phone'},
//     {headerName:'Owner',field:'owner'},
//     {headerName:'Status',field:'status'},
//     {headerName:'Created Date',field:'cd'},
//     {headerName:'Company',field:'company'},
//     {headerName:'Tag',field:'tag'},
//     {headerName:'Tag1',field:'tag1'},
//     {headerName:'FTD',field:'ftd'},
//     {headerName:'Desk',field:'desk'},
