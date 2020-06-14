import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from 'src/app/clients_info/comments/comments.service';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/settings/groups/groups.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  dltclientRes: any;
  detail: number;
  dltAllComment: any;
  comments: any;
  
  constructor(private commentsService: CommentsService, private bsmodal: BsModalRef, private clientService: ClientsService, private spinnerService: Ng4LoadingSpinnerService, private _route: ActivatedRoute, private groupsService: GroupsService) {}
// delete comment
id: number;
dltCmnt: boolean;
comment: any;
deleteComment = false;
// all comment
deleteallComment = false;
allcomment: any;
// delete client
userId: number;
rmvClient: any;
removeClient = false;
// remove groups
removeGroups = false;
rmvGroup: any;
removegroup: any;
selectedgrpwilldltd: number;
title: any;

  ngOnInit() {
    if (this.comment === 'comment') {
      this.deleteComment = true;
    } else {
      this.deleteComment = false;
    }
    if (this.allcomment === 'allcomment') {
      this.deleteallComment = true;
    } else {
      this.deleteallComment = false;
    }
    if (this.rmvClient === 'rmvClient') {
      this.removeClient = true;
    } else {
      this.removeClient = false;
    }
    if (this.rmvGroup === 'rmvGroup') {
      this.removeGroups = true;
    } else {
      this.removeGroups = false;
    }
    this.userComments();
  }
  // get all comments
  userComments() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.commentsService.getComments(this.detail).subscribe(res => {
      // this.spinnerService.show();
      this.comments = res;
      console.log('comments', res);
    });
  }
  dltComment() {
    this.commentsService.deleteComment(this.id).subscribe(res => {
      this.dltCmnt = res;
      // console.log('dltCmnt', res);
      this.clddata.emit(res);
      this.hideModal();
    },
    );
  }
  dltallComment() {
    this.commentsService.deleteAllComment('this.detail').subscribe(res => {
      this.dltAllComment = res;
      this.userComments();
      this.clddata.emit(res);
      this.hideModal();
      // console.log('dltAllComment', res);
    });
  }
  dltClient() {
    this.clientService.dltmultipleClient(this.userId).subscribe(res => {
      this.spinnerService.show();
      this.dltclientRes = res;
      this.clddata.emit(res);
      console.log('dltclientRes', res);
      this.hideModal();
    });
  }
  dltGroups() {
    this.groupsService.deleteGroups(this.selectedgrpwilldltd).subscribe(rmvgrp => {
      this.removegroup = rmvgrp;
      this.clddata.emit(rmvgrp);
      console.log('removegroup',rmvgrp);
      this.hideModal();
    })
  }
  hideModal() {
this.bsmodal.hide();
  }
}
