import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralInfoService } from '../clients_info/general-info/general-info.service';
import { ClientsService } from '../header/clients/clients.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ModalDirective, BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateTaskComponent } from '../clients_info/tasks-info/create-task/create-task.component';
import { TasksInfoService } from '../clients_info/tasks-info/tasks-info.service';
import { ActcrtaccComponent } from './actcrtacc/actcrtacc.component';


@Component({
  selector: 'app-clients-info',
  templateUrl: './clients-info.component.html',
  styleUrls: ['./clients-info.component.css']
})
export class ClientsInfoComponent implements OnInit {
  userid: any;
  Apptitle: any;
  userGenralinfo: any;
  details: any;
  clientInfo: any;
  rowData: any;
  realAccountSection = false;
  TypeName: any;
  accountInfo: any[];
  leadInfo: any[];
  getInfoTasks: any;
  constructor(private router: Router, private _generalinfoservice: GeneralInfoService, private _route: ActivatedRoute,
              private clientService: ClientsService, private spinnerService: Ng4LoadingSpinnerService, private modalService: BsModalService,
              private taskInfoService: TasksInfoService
               ) {
      // tslint:disable-next-line: only-arrow-functions
      this.router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
        };
     }
     bsModalRef: BsModalRef;

  ngOnInit() {
    // For jump to specific clients.see below method "sendData"
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    console.log(details);
    // API of general section use for showing name of selected client
    this.spinnerService.show();
    setTimeout( () => {
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
      console.log('generalinfo', res);
      if ( this.userGenralinfo.TypeName === 'Real') {
        this.realAccountSection = true;
      } else {
        this.realAccountSection = false;
      }
    });
    }, );
    this.userDetails();
  }
  // get all 'clientdetailbyownerId/1' for jump to clients for showing name(all first and last name)
  userDetails() {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res.reverse();
        console.log('res', res);
      }
    });

  }
  // in route send Id for jump to clients
  sendData(selectedItem: any) {
    this.router.navigate(['/info', selectedItem]);
  }
  // for opening create task popup
  createtask() {
    const initialState = {
      title: 'Create Task',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateTaskComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-lg', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      // after update refresh all the data
      this.getAllTask();
    });
  }
  getAllTask() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.taskInfoService.getTask(details).subscribe(res => {
      this.getInfoTasks = res.reverse();
      console.log('taskget', res);
    });
  }
  // open crt acc popup
  crtacc() {
    const initialState = {
      title: 'Create Account',
      createaccount: 'createaccount'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    // this.bsModalRef.content.clddata.subscribe(data => {
    //   this.getAllTask();
    // });
  }
  sendemail() {
    const initialState = {
      title: 'SEND EMAIL',
      sendemail: 'sendemail'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  sendsms() {
    const initialState = {
      title: 'SMS: SEND',
      sendsms: 'sendsms'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  viewhistory() {
    const initialState = {
      title: 'VIEW HISTORY',
      viewhistory: 'viewhistory'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
}

