import { Component, OnInit } from '@angular/core';
import { TasksInfoService } from './tasks-info.service';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tasks-info',
  templateUrl: './tasks-info.component.html',
  styleUrls: ['./tasks-info.component.css']
})
export class TasksInfoComponent implements OnInit {
  getUserTasks: any;
  getInfoTasks: any;


  constructor(private taskInfoService: TasksInfoService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;

  ngOnInit() {
    this.getAllTask();
  }
  getAllTask() {
    this.taskInfoService.getTask(this.getUserTasks).subscribe(res => {
      this.getInfoTasks = res.reverse();
      console.log('taskget', res);
    });
  }
  edittask(userid) {
    console.log(userid);
    const initialState = {
      title: 'Edit Task',
      wholeData: userid
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(EditTaskComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getAllTask();
    });
    
  }



}
