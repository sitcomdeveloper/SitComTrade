import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from 'src/app/clients_info/tasks-info/tasks-info.service';
import { CreateTaskComponent } from 'src/app/clients_info/tasks-info/create-task/create-task.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { EditTaskComponent } from 'src/app/clients_info/tasks-info/edit-task/edit-task.component';
import * as $ from 'jquery'
import { DeleteComponent } from 'src/app/common/delete/delete.component';
import { ActivitiesService } from '../activities.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  getInfoTasks: any;
  getLoginDetails: any;
  bindLoginData: any;
  taskslen: any;
  deletbtnn = true;
  selectedchkbxfrdlttasks = [];
  UserId: any;
  constructor(private taskInfoService:TasksInfoService, private modalService: BsModalService, 
    private activityService: ActivitiesService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;

    this.getAllTask();

    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
        var chlength = $('.checkBoxClass:checked').length;
        $("#chked").html("<span>" + chlength + " items checked from</span>");
      });
    });
  }
  getAllTask() {
    const gtalltasks = {
      OwnerId: this.bindLoginData.UserId,
      DataOwnerTypeId: 1,
    }
    this.activityService.getTasks(gtalltasks).subscribe(res => {
      this.getInfoTasks = res.reverse();
      this.taskslen = this.getInfoTasks.length;
    });
  }
  createtask() {
    const initialState = {
      title: 'Create Task',
      id: this.bindLoginData.UserId
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTaskComponent, Object.assign({  show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getAllTask();
    });
  }
  edittask(userid) {
    const initialState = {
      title: 'Edit Task',
      wholeData: userid
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(EditTaskComponent, Object.assign({  show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getAllTask();
    });
  }
  deletbtn(val, userid) {
    this.UserId = userid
    if (val === true) {
      this.deletbtnn = false;
      this.selectedchkbxfrdlttasks.push(userid);
    } else {
      this.deletbtnn = true;
      this.selectedchkbxfrdlttasks.splice(this.selectedchkbxfrdlttasks.indexOf(userid), 1)
    }
  }
   // delete tasks
   deleteTasks() {
    const initialState = {
      title: 'Delete Tasks',
      selectedchkbxwilldltd: this.selectedchkbxfrdlttasks,
      // for div close or hide
      rmvTasks: 'rmvTasks'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({  show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.getAllTask();
    });
  }
}
