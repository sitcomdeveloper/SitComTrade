import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {
  userTasks: any;
  getTasks: any;
  getTaskTypeData: any;
  getStatus: any;
  getTaskStatusData: any;

  constructor(private taskInfoService: TasksInfoService) { }

  ngOnInit() {
    this.infoTasks();
    this.taskType();
    this.taskStatus();
  }
  infoTasks() {
    const obj = {
      OwnerId: 1
    };
    this.taskInfoService.insertTask(obj).subscribe(res => {
    this.userTasks = res;
    console.log('tasks', res);
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

}
