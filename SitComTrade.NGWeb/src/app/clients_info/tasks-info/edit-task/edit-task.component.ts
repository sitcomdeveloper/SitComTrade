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

  constructor(private bsmodal: BsModalRef, private taskInfoService: TasksInfoService, private fb: FormBuilder) { }

  ngOnInit() {
    this.taskInfoForm = this.fb.group({
      owner: [''],
      type: [''],
      status: [''],
      description: ['']
    });
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
  // patch value for edit task
   getAllTask() {
    // this.taskInfoService.getTask(this.id).subscribe(res => {
      // this.getInfoTasks = res;
      this.taskInfoForm.patchValue({
        type: this.wholeData.TaskType,
        status: this.wholeData.TaskStatus,
        description: this.wholeData.Description
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
      Description: this.taskInfoForm.value.description
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
