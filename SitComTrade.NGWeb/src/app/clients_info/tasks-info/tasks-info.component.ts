import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {
  userTasks: any;
  

  constructor(private taskInfoService: TasksInfoService) { }

  ngOnInit() {
    this.infoTasks();
    
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


}
