import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from '../tasks-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  getTasks: any;
  getTaskTypeData: any;
  getStatus: any;
  getTaskStatusData: any;
  userTasks: any;
  taskInfoForm: FormGroup;
  getUserTasks: any;
  getInfoTasks: any;
  detail: number;
  moreId: number;
  isstaticvalue: any;
  getLoginDetails: any;
  bindLoginData: any;

  constructor(private taskInfoService: TasksInfoService, private fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskInfoForm = this.fb.group({
      owner: [''],
      type: [''],
      status: [''],
      transport: [''],
      description: [''],
      notitimebefore: [''],
      taskStatusId: [''],
      statusName: [''],
      taskName: ['']
});
 // code for receiving login details and bind to owner name at place of name
 this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
 console.log('LoginData', this.getLoginDetails);
 this.bindLoginData = this.getLoginDetails;
 
    this.getAllTask();
    this.taskType();
    this.taskStatus();
  //   if(this.isstaticvalue === 'most') {
  //     this.getStatus.forEach(element => {
  //       if (element.Id === +this.taskInfoForm.value.status) {
  //         this.taskInfoForm.value.statusName = element.Name;
  //       }
  //     });
  //     this.getTasks.forEach(element => {
  //       if (element.Id === +this.taskInfoForm.value.type) {
  //         this.taskInfoForm.value.taskName = element.Name;
  //       }
  //     });
  //     const obj = {
  //       OwnerId: this.moreId,
  //       TaskStatusId: this.taskInfoForm.value.status,
  // TaskTypeId: this.taskInfoForm.value.type,
  // NotiTrasportId: 1,
  // TaskType: this.taskInfoForm.value.taskName,
  // Description: this.taskInfoForm.value.description,
  // TaskStatus: this.taskInfoForm.value.statusName,
  // NotiTimeBefore: this.taskInfoForm.value.notitimebefore
  //     };
  //     this.taskInfoService.insertTask(obj).subscribe(res => {
  //     this.userTasks = res;
  //     // window.location.reload();
  //     console.log('inserttasks', res);
  //   });
  //   } else {
  //     this.getAllTask();
  //   this.taskType();
  //   this.taskStatus();
  //   }
    
  }
  getAllTask() {
    const details = +this.route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.taskInfoService.getTask(details).subscribe(res => {
      this.getInfoTasks = res.reverse();
      console.log('taskget', res);
    });
  }
  taskType() {
    this.taskInfoService.getTaskType(this.getTaskTypeData).subscribe(res => {
      this.getTasks = res;
      console.log('tasktype', res);
    });
  }
  taskStatus() {
    this.taskInfoService.getTaskStatus(this.getTaskStatusData).subscribe(res => {
      this.getStatus = res;
      console.log('taskstatus', res);
    });
  }
  // insert task
  infoTasks() {
    this.getStatus.forEach(element => {
      if (element.Id === +this.taskInfoForm.value.status) {
        this.taskInfoForm.value.statusName = element.Name;
      }
    });
    this.getTasks.forEach(element => {
      if (element.Id === +this.taskInfoForm.value.type) {
        this.taskInfoForm.value.taskName = element.Name;
      }
    });
    const obj = {
      OwnerId: this.detail,
      TaskStatusId: this.taskInfoForm.value.status,
TaskTypeId: this.taskInfoForm.value.type,
NotiTrasportId: 1,
TaskType: this.taskInfoForm.value.taskName,
Description: this.taskInfoForm.value.description,
TaskStatus: this.taskInfoForm.value.statusName,
NotiTimeBefore: this.taskInfoForm.value.notitimebefore,
TaskDate: this.taskInfoForm.value.taskdate
    };
    this.taskInfoService.insertTask(obj).subscribe(res => {
    this.userTasks = res;
    window.location.reload();
    console.log('inserttasks', res);
  });
}

}
