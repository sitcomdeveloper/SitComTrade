import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from 'src/app/clients_info/comments/comments.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  constructor(private commentsService: CommentsService, private bsmodal: BsModalRef) {}
id: number;
dltCmnt: boolean;

  ngOnInit() {
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
  hideModal() {
this.bsmodal.hide();
  }
}
