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

  constructor(private taskInfoService: TasksInfoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.taskInfoForm = this.fb.group({
      owner: [''],
      type: [''],
      status: [''],
      transport: ['']

    });
    this.taskType();
    this.taskStatus();
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
TaskTypeId: +this.taskInfoForm.value.status,
NotiTrasportId: 1,
TaskType: +this.taskInfoForm.value.type
    };
    this.taskInfoService.insertTask(obj).subscribe(res => {
    this.userTasks = res;
    console.log('tasks', res);
  });
}

}
