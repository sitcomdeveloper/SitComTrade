import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private commentsService: CommentsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.commentsForm = this.fb.group({
      commentarea: ['']
    });
    this.userComments();
    this.editComment();
  }
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
      console.log('insertcomment', res);
    });
  }
  deleteAll() {
    this.commentsService.deleteAllComment('').subscribe(res => {
      this.dltAllComment = res;
      console.log('dltAllComment', res);
    });
  }

}
