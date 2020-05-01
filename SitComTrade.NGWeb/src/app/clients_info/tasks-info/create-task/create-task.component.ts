import { Component, OnInit } from '@angular/core';

import { TasksInfoService } from '../tasks-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  constructor(private taskInfoService: TasksInfoService, private fb: FormBuilder,) { }

  ngOnInit() {
    this.taskInfoForm = this.fb.group({
      owner: [''],
      type: [''],
      status: [''],
      transport: [''],
      description: [''],
      notitimebefore: [''],
      taskStatusId: ['']

    });
    this.getAllTask();
    this.taskType();
    this.taskStatus();
  }
  getAllTask() {
    this.taskInfoService.getTask(this.getUserTasks).subscribe(res => {
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
    const obj = {
      OwnerId: 1,
      TaskStatusId: 1,
TaskTypeId: 1,
NotiTrasportId: 1,
TaskType: this.taskInfoForm.value.type,
Description: this.taskInfoForm.value.description,
TaskStatus: this.taskInfoForm.value.status,
NotiTimeBefore: this.taskInfoForm.value.notitimebefore
    };
    this.taskInfoService.insertTask(obj).subscribe(res => {
    this.userTasks = res;
    window.location.reload();
    console.log('inserttasks', res);
  });
    this.getStatus.forEach(element => {
    if (element.Id === this.taskInfoForm.value.status) {
      this.taskInfoForm.value.status = element.Name;
    }
  });
}


}
