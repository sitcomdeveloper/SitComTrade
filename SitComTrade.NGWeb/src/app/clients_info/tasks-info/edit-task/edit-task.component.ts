import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TasksInfoService } from '../tasks-info.service';


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  getTasks: any;
  getStatus: any;
  getTaskTypeData: any;
  getTaskStatusData: any;
  taskInfoForm: FormGroup;
  taskeditRes: any;
  getUserTasks: any;
  getInfoTasks: any;
  title: any;
  wholeData: any;
  getLoginDetails: any;
  bindLoginData: any;
  // tskdte: any;
  // take: any

  constructor(private bsmodal: BsModalRef, private taskInfoService: TasksInfoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.taskInfoForm = this.fb.group({
      owner: [''],
      type: [''],
      status: [''],
      description: [''],
      taskdate: ['']
    });
     // code for receiving login details and bind to owner name at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;
     
    this.getAllTask();
    this.taskType();
    this.taskStatus();
  }
  taskType() {
    this.taskInfoService.getTaskType(this.getTaskTypeData).subscribe(res => {
      this.getTasks = res;
    });
  }
  taskStatus() {
    this.taskInfoService.getTaskStatus(this.getTaskStatusData).subscribe(res => {
      this.getStatus = res;
    });
  }
//  const tskdte = this.wholeData.TaskDate.split('T')
//   this.take = tskdte[0];
  // patch value for edit task
   getAllTask() {
      this.taskInfoForm.patchValue({
        // owner: this.bindLoginData.FullName,
        type: this.wholeData.TaskType,
        status: this.wholeData.TaskStatus,
        description: this.wholeData.Description,
        // const tskdte = this.wholeData.TaskDate.split('T'),
        // const reqtskdte = tskdte[0]
        taskdate: this.wholeData.TaskDate
        // this.useraddinfo = this.userGenralinfo;
    // const date = this.userGenralinfo.CreatedAt.split('T');
    // const userDate = date[0];
      });
  }
  saveEditTaskData() {
    const obj = {
      Id: this.wholeData.Id,
      OwnerId:  this.wholeData.OwnerId,
      TaskStatusId: this.wholeData.TaskStatusId,
      TaskTypeId: this.wholeData.TaskTypeId,
      NotiTrasportId: this.wholeData.NotiTrasportId,
      NotiTimeBefore: this.wholeData.NotiTimeBefore,
      TaskType : this.taskInfoForm.value.type,
      TaskStatus: this.taskInfoForm.value.status,
      Description: this.taskInfoForm.value.description,
      TaskDate: new Date(this.taskInfoForm.value.taskdate),
      DataOwnerTypeId: this.wholeData.DataOwnerTypeId,
      DataOwnerTypeName: this.wholeData.DataOwnerTypeName
    };
    this.taskInfoService.edtTsk(obj).subscribe(res => {
      this.taskeditRes = res;
      this.clddata.emit(res);
      console.log('taskeditRes', res);
      this.hideModal();
    });
  }
  hideModal() {
    this.bsmodal.hide();
  }

}
