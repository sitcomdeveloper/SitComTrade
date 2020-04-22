import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {


  constructor(private taskInfoService: TasksInfoService) { }

  ngOnInit() {
  }



}
