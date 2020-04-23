import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {
  getUserTasks: any;
  getInfoTasks: any;


  constructor(private taskInfoService: TasksInfoService) { }

  ngOnInit() {
    this.getAllTask();
  }
  getAllTask() {
    this.taskInfoService.getTask(this.getUserTasks).subscribe(res => {
      this.getInfoTasks = res;
      console.log('taskget', res);
    });
  }



}
