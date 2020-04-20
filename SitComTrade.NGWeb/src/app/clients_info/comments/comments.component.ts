import { Component, OnInit } from '@angular/core';
import { CommentsService } from './comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  insert: any;
  comments: any;
  infoComment: any;

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.userComments();
  }
  userComments() {
    this.commentsService.getComments(this.infoComment).subscribe(res => {
      this.comments = res;
      console.log('comments', res);
    });
  }
  addComment() {
    const obj = {
      CommentDescription: 'test comm desc',
      OwnerId: 1
    };
    this.commentsService.insertComments(obj).subscribe(res => {
      this.insert = res;
      console.log('insertcomment', res);
    });
  }

}
