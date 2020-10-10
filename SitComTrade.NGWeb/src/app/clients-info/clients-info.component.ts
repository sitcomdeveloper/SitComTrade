import { Component, OnInit, HostListener } from '@angular/core';
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
  detail: number;
  tkemail: any;
  leadAccountSection = true;
  userinfo: any;
 
  @HostListener("window:scroll", []) onWindowScroll() {
    this.scrollFunction();
  }
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
    this.detail = details;
    // API of general section use for showing name of selected client
    this.spinnerService.show();
    setTimeout( () => {
    this._generalinfoservice.getUsersInfo(details).subscribe(res => {
      this.userGenralinfo = res;
      // console.log('generalinfo', res);
      if ( this.userGenralinfo.TypeName === 'Real') {
        this.realAccountSection = true;
        this.leadAccountSection = false;
      } else {
        this.realAccountSection = false;
      }
    });
    // const details = +this._route.snapshot.paramMap.get('selectedItem');
    // this.detail = details;
    this._generalinfoservice.GetTradeAccountListByClientId(details).subscribe(res => {
      this.userinfo = res;
      console.log('userinfo',res);
    });
    }, );
    this.userDetails();
  }
  // get all 'clientdetailbyownerId/1' for jump to clients for showing name(all first and last name)
  userDetails() {
    this.clientService.getUsers(this.clientInfo).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {
        this.rowData = res.reverse();
        // console.log('res', res);
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
      infotasks:'infotasks',
      id: this.detail
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
      // console.log('taskget', res);
    });
  }
  // open crt acc popup
  crtacc(Ide) {
    const initialState = {
      title: 'Create Account',
      createaccount: 'createaccount',
      detailss: Ide
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal-750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.afterupdate();
    });
  }
  // aftercreate account
  // ge all details by id
  afterupdate() {
    this._generalinfoservice.getUsersInfo(this.detail).subscribe(res => {
      this.userGenralinfo = res;
    })
  }
  // get all mails
  gettheMail() {
    this._generalinfoservice.getMail(this.detail).subscribe(gtmal => {
      this.tkemail = gtmal;
    })
  }
  sendemail(Ide) {
    const initialState = {
      title: 'SEND EMAIL',
      sendemail: 'sendemail',
      // get Id for showing email on popup
      detailss: Ide
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal750', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.gettheMail();
    });
  }
  sendsms(Ide) {
    const initialState = {
      title: 'SMS: SEND',
      sendsms: 'sendsms',
      // get Id for showing phone no. on popup
      detailss: Ide
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal600', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  viewhistory(Ide) {
    const initialState = {
      title: 'VIEW HISTORY',
      viewhistory: 'viewhistory',
      detailss: Ide
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(ActcrtaccComponent, Object.assign({ backdrop: 'static', show: true }, { class: 'modal1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
    // When the user scrolls down 20px from the top of the document, show the button
scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("myBtn").style.display = "block";
  } else {
      document.getElementById("myBtn").style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
topFunction() {
  document.documentElement.scrollTop = 0;
} 
}

