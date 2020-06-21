import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TasksInfoService } from '../tasks-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
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
  title: any;
  id: any;
  taskdate: string;
  
  constructor(private taskInfoService: TasksInfoService, private fb: FormBuilder,private bsModalRef: BsModalRef, private route: ActivatedRoute) { }

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
      taskName: [''],
      taskdate: ['']
});
 // code for receiving login details and bind to owner name at place of name
 this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
 this.bindLoginData = this.getLoginDetails;
 
    this.getAllTask();
    this.taskType();
    this.taskStatus();
    
    let d = new Date();
    let date: number | string = d.getDate();
date.toString().length == 1 ?  date = '0' + date: date;
let Month: number | string = d.getMonth();
Month.toString().length == 1 ?  Month = '0' + Month: Month;
let year = d.getFullYear();
let hour=d.getHours();
let minute = d.getMinutes();
let second = d.getSeconds();
let millisecond = d.getMilliseconds();
const Tdate = date+'-'+Month+'-'+year+'T'+hour+':'+minute+':'+second+'.'+millisecond;
this.taskdate = Tdate;
// console.log(date+'-'+Month+'-'+year+'T'+hour+':'+minute+':'+second+'.'+millisecond);
  }
  getAllTask() {
    const details = +this.route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.taskInfoService.getTask(details).subscribe(res => {
      this.getInfoTasks = res.reverse();
      // console.log('taskget', res);
    });
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
      OwnerId: this.id,
      TaskStatusId: this.taskInfoForm.value.status,
TaskTypeId: this.taskInfoForm.value.type,
NotiTrasportId: 1,
TaskType: this.taskInfoForm.value.taskName,
Description: this.taskInfoForm.value.description,
TaskStatus: this.taskInfoForm.value.statusName,
NotiTimeBefore: this.taskInfoForm.value.notitimebefore,
TaskDate: this.taskdate,
DataOwnerTypeId: 2,
DataOwnerTypeName: 'Client',
// Date()
// this.taskInfoForm.value.taskdate
    };
    this.taskInfoService.insertTask(obj).subscribe(res => {
    this.userTasks = res;
    this.clddata.emit(res);
    // console.log('inserttasks', res);
    this.hideModal();
  });
}
hideModal() {
  this.bsModalRef.hide();
}

}
