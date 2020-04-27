import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  insert: any;
  comments: any;
  infoComment: any;
  commentsForm: FormGroup;
  dltAllComment: any;
  dltAll: any;
  constructor(private commentsService: CommentsService, private fb: FormBuilder, private modalService: BsModalService) { }
   bsModalRef: BsModalRef;

  ngOnInit() {
    this.commentsForm = this.fb.group({
      commentarea: ['']
    });
    this.userComments();
    this.editComment();
  }
  // get all comments
  userComments() {
    this.commentsService.getComments(this.infoComment).subscribe(res => {
      this.comments = res;
      console.log('comments', res);
    });
  }
  editComment() {
    this.commentsService.getComments(this.infoComment).subscribe(res => {
      this.comments = res;
      this.commentsForm.patchValue({
        commentarea: this.comments.CommentDescription,
      });
    });
  }
  addComment() {
    const obj = {
      CommentDescription: this.commentsForm.value.commentarea,
      OwnerId: 1
    };
    this.commentsService.insertComments(obj).subscribe(res => {
      this.insert = res;
      this.userComments();
      console.log('insertcomment', res);
    });
  }
  deleteAll() {
    this.commentsService.deleteAllComment('this.dltAll').subscribe(res => {
      this.dltAllComment = res;
      this.userComments();
      console.log('dltAllComment', res);
    });
  }
// open modal for delete comment by id
openDltComment(userId) {
    const initialState = {
      title: 'DELETE COMMENT',
      id: userId
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after delete refresh all the data
      this.userComments();
    });
  }
}
