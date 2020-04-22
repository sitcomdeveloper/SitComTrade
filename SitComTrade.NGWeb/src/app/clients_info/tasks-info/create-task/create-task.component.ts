import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from '../tasks-info.service';

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

  constructor(private taskInfoService: TasksInfoService) { }

  ngOnInit() {
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

}
