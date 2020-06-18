import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


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
  moreIdInfo: number
  dltAll: any;
  getLoginDetails: any;
  iscustomevalue: any;
  closeModal = false;
  bindLoginData: any;
  detail: number;
  addcommentsby3Dots: string;
  nocomments = true;
  lenofcomments: any;

  constructor(private commentsService: CommentsService, private fb: FormBuilder,
              // tslint:disable-next-line: variable-name
              private modalService: BsModalService, private _route: ActivatedRoute) {}
   bsModalRef: BsModalRef
 

  ngOnInit() {
    // code for receiving login details and bind owner name at place of  name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;
    // comments code
    this.commentsForm = this.fb.group({ 
      commentarea: ['']
    });
    // for getting id from client page.Opening popup by  clicking on 3-dots
    if(this.iscustomevalue ==='more') {
      this.closeModal = true;
      this.commentsService.getComments(this.moreIdInfo).subscribe(res => {
        
        this.comments = res;
        console.log('comments', res);
      });
    } 
    // else if(this.addcommentsby3Dots === 'add') {
    //   const obj = {
    //     CommentDescription: this.commentsForm.value.commentarea,
    //     OwnerId: this.moreIdInfo
    //   };
    //   this.commentsService.insertComments(obj).subscribe(res => {
    //     // this.spinnerService.show();
    //     this.insert = res;
    //     this.userComments();
    //     console.log('insertcomment', res);
    //     this.commentsForm.reset();
    //   });
    // } 
    else {
      this.userComments();
      this.editComment();
    }
    // this.userComments();
    //   this.editComment();
    
    
  }
  // get all comments
  userComments() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.commentsService.getComments(this.detail).subscribe(res => {
      // this.spinnerService.show();
      this.comments = res;
      this.lenofcomments = res.length;
      console.log('comm',this.lenofcomments);
      if(this.lenofcomments === 0) {
        this.nocomments = true;
      } else {
        this.nocomments = false;
      }
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
      // this.spinnerService.show();
      this.insert = res;
      this.userComments();
      console.log('insertcomment', res);
      this.commentsForm.reset();
    });
  }
  opendeleteAll() {
    const initialState = {
      title: 'Delete Comment',
      // div show hide.see in delete component
      allcomment: 'allcomment'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after delete refresh all the data
      this.userComments();
    });
  }
// open modal for delete comment by id
openDltComment(userId) {
    const initialState = {
      title: 'Delete Comment',
      id: userId,
      // div show hide.see in delete component
      comment: 'comment'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after delete refresh all the data
      this.userComments();
    });
  }
  // hideModal() {
  //   this.bsmodal.hide();
  // }
}
