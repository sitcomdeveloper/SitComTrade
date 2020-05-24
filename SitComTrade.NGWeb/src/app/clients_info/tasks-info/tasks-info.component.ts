import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {
  getUserTasks: any;
  getInfoTasks: any;
  getLoginDetails: any;
  bindLoginData: any;


  constructor(private taskInfoService: TasksInfoService, private modalService: BsModalService, private route: ActivatedRoute) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    // code for receiving login details and bind to owner name at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    console.log('LoginData', this.getLoginDetails);
    this.bindLoginData = this.getLoginDetails;
    this.getAllTask();
  }
  getAllTask() {
    const details = +this.route.snapshot.paramMap.get('selectedItem');
    this.taskInfoService.getTask(details).subscribe(res => {
      this.getInfoTasks = res.reverse();
      console.log('taskget', res);
    });
  }
  edittask(userid) {
    console.log(userid);
    const initialState = {
      title: 'Edit Task',
      wholeData: userid
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(EditTaskComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getAllTask();
    });
  }



}
