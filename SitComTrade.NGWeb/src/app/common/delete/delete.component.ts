import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from 'src/app/clients_info/comments/comments.service';
import { ClientsService } from 'src/app/header/clients/clients.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  dltclientRes: any;
  constructor(private commentsService: CommentsService, private bsmodal: BsModalRef, private clientService: ClientsService, private spinnerService: Ng4LoadingSpinnerService) {}
// delete comment
id: number;
dltCmnt: boolean;
comment: any;
deleteComment = false;
// delete client
userId: number;
rmvClient: any;
removeClient = false;
title: any;

  ngOnInit() {
    if (this.comment === 'comment') {
      this.deleteComment = true;
    } else {
      this.deleteComment = false;
    }
    if (this.rmvClient === 'rmvClient') {
      this.removeClient = true;
    } else {
      this.removeClient = false;
    }
  }
  dltComment() {
    this.commentsService.deleteComment(this.id).subscribe(res => {
      this.dltCmnt = res;
      console.log('dltCmnt', res);
      this.clddata.emit(res);
      this.hideModal();
    },
    );
  }
  dltClient() {
    this.clientService.dltClient(this.userId).subscribe(res => {
      this.spinnerService.show();
      this.dltclientRes = res;
      this.clddata.emit(res);
      console.log('dltclientRes', res);
      this.hideModal();
    });
  }
  hideModal() {
this.bsmodal.hide();
  }
}
