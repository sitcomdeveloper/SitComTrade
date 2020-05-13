import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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
  getLoginDetails: any;
  bindLoginData: any;
  detail: number;
  constructor(private commentsService: CommentsService, private fb: FormBuilder,
              // tslint:disable-next-line: variable-name
              private modalService: BsModalService, private _route: ActivatedRoute, private spinnerService: Ng4LoadingSpinnerService) { }
   bsModalRef: BsModalRef;

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(localStorage.getItem('project'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    // comments code
    this.commentsForm = this.fb.group({
      commentarea: ['']
    });
    this.userComments();
    this.editComment();
  }
  // get all comments
  userComments() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.commentsService.getComments(details).subscribe(res => {
      this.spinnerService.show();
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
      OwnerId: this.detail
    };
    this.commentsService.insertComments(obj).subscribe(res => {
      this.spinnerService.show();
      this.insert = res;
      this.userComments();
      console.log('insertcomment', res);
      this.commentsForm.reset();
    });
  }
  deleteAll() {
    this.commentsService.deleteAllComment('this.detail').subscribe(res => {
      this.dltAllComment = res;
      this.userComments();
      console.log('dltAllComment', res);
    });
  }
// open modal for delete comment by id
openDltComment(userId) {
    const initialState = {
      title: 'DELETE COMMENT',
      id: userId,
      // div show hide.see in delete component
      comment: 'comment'
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
