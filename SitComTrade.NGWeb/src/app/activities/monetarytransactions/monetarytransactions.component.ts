import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivitiesService } from '../activities.service';
import * as $ from 'jquery'
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DeleteComponent } from 'src/app/common/delete/delete.component';

@Component({
  selector: 'app-monetarytransactions',
  templateUrl: './monetarytransactions.component.html',
  styleUrls: ['./monetarytransactions.component.css']
})
export class MonetarytransactionsComponent implements OnInit {
  MonetryTransactions: any;
  deleteemnetrytrans: any;
  totalnumofMonetryTransctions: any;
  UserId: any;
  deletbtnn = true;
  selectedchkbxfrdltmonetarytransactions = [];

  constructor(private router: Router, private activitiesService: ActivitiesService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  
  ngOnInit() {
    const getmonetrytransactios= {}
    this.activitiesService.getMonetaryTransactions(getmonetrytransactios).subscribe(allmonetrytrnsctions => {
      this.MonetryTransactions = allmonetrytrnsctions.reverse();
      this.totalnumofMonetryTransctions = this.MonetryTransactions.length;
      // console.log('MonetryTransactions',allmonetrytrnsctions);
    })
    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
    });
  }
  allmonetarytrnsactios() {
    const getmonetrytransactios= {}
    this.activitiesService.getMonetaryTransactions(getmonetrytransactios).subscribe(allmonetrytrnsctions => {
      this.MonetryTransactions = allmonetrytrnsctions.reverse();
    })
  }
  deletbtn(val, userid) {
    this.UserId = userid
    if (val === true) {
      this.deletbtnn = false;
      this.selectedchkbxfrdltmonetarytransactions.push(userid);
    } else {
      this.deletbtnn = true;
      this.selectedchkbxfrdltmonetarytransactions.splice(this.selectedchkbxfrdltmonetarytransactions.indexOf(userid), 1)
    }
  }
  // delete monetary transactions
  dltmonetryTransaction() {
    const initialState = {
      title: 'Delete Item',
      collectionofId: this.selectedchkbxfrdltmonetarytransactions,
      // for div close or hide
      rmvmonetrytransactions: 'rmvmonetrytransactions'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.allmonetarytrnsactios();
    });
  }
  userClick() {
    mnetarytrnsactions: 'mnetarytrnsactions';
    this.router.navigate(['/info', 189]);
  }
  movetoTradeaccountInfo(selectedinfo: any) {
    this.router.navigate(['/trade-info', selectedinfo]);
  }
}