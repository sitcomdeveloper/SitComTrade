import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommentsService } from 'src/app/clients_info/comments/comments.service';
import { ClientsService } from 'src/app/header/clients/clients.service';
// import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from 'src/app/settings/groups/groups.service';
import { ActivitiesService } from 'src/app/activities/activities.service';
import { SettingsService } from 'src/app/settings/settings.service';
import { Workflows, InstrumentsDTO, IpDTO } from 'src/app/settings/settingsDTO';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  dltclientRes: any;
  detail: number;
  dltAllComment: any;
  comments: any;
  id: number;
dltCmnt: boolean;
comment: any;
deleteComment = false;
// all comment
deleteallComment = false;
allcomment: any;
// delete client
userId: number;
rmvClient: any;
removeClient = false;
// remove groups
removeGroups = false;
rmvGroup: any;
removegroup: any;
selectedgrpwilldltd: number;
title: any;
// tasks
removeTasks = false
rmvTasks: any;
  removetasks: any;
  selectedchkbxwilldltd: number;
  rmvInstruments: any;
  removeInstruments = false;
  dltinstrumentsData: InstrumentsDTO;
  selectedinstrumentswilldltd: InstrumentsDTO;
  removeWorkflows = false;
  rmvWorkflow: any;
  wrkflwdlt: Workflows;
  willdltwrkflw: Workflows;
  // IP
  removeIP = false;
  rmvIP: string;
  userIdofIP: number;
  ipdlt: IpDTO;
  rmvmonetrytransactions: string;
  // monetary transactions
  removemonetaryTransactionss = false;
  deleteemnetrytrans: any;
  collectionofId: number;

  constructor(private commentsService: CommentsService, private bsmodal: BsModalRef, private clientService: ClientsService, private _route: ActivatedRoute, private groupsService: GroupsService, private activitiesService: ActivitiesService, private settingsService: SettingsService) {}


  ngOnInit() {
    if (this.comment === 'comment') {
      this.deleteComment = true;
    } else {
      this.deleteComment = false;
    }
    if (this.allcomment === 'allcomment') {
      this.deleteallComment = true;
    } else {
      this.deleteallComment = false;
    }
    if (this.rmvClient === 'rmvClient') {
      this.removeClient = true;
    } else {
      this.removeClient = false;
    }
    if (this.rmvGroup === 'rmvGroup') {
      this.removeGroups = true;
    } else {
      this.removeGroups = false;
    }
    if (this.rmvTasks === 'rmvTasks') {
      this.removeTasks = true;
    } else {
      this.removeTasks = false;
    }
    if (this.rmvInstruments === 'rmvInstruments') {
      this.removeInstruments = true;
    } else {
      this.removeInstruments = false;
    }
    if (this.rmvWorkflow === 'rmvWorkflow') {
      this.removeWorkflows = true;
    } else {
      this.removeWorkflows = false;
    }
    if (this.rmvIP === 'rmvIP') {
      this.removeIP = true;
    } else {
      this.removeIP = false;
    }
    if (this.rmvmonetrytransactions === 'rmvmonetrytransactions') {
      this.removemonetaryTransactionss = true;
    } else {
      this.removemonetaryTransactionss = false;
    }
    this.userComments();
  }
  // get all comments
  userComments() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.commentsService.getComments(this.detail).subscribe(res => {
      // this.spinnerService.show();
      this.comments = res;
      console.log('comments', res);
    });
  }
  dltComment() {
    this.commentsService.deleteComment(this.id).subscribe(res => {
      this.dltCmnt = res;
      // console.log('dltCmnt', res);
      this.clddata.emit(res);
      this.hideModal();
    },
    );
  }
  dltallComment() {
    this.commentsService.deleteAllComment('this.detail').subscribe(res => {
      this.dltAllComment = res;
      this.userComments();
      this.clddata.emit(res);
      this.hideModal();
      // console.log('dltAllComment', res);
    });
  }
  dltClient() {
    this.clientService.dltmultipleClient(this.userId).subscribe(res => {
      // this.spinnerService.show();
      this.dltclientRes = res;
      this.clddata.emit(res);
      // console.log('dltclientRes', res);
      this.hideModal();
    });
  }
  dltGroups() {
    this.groupsService.deleteGroups(this.selectedgrpwilldltd).subscribe(rmvgrp => {
      this.removegroup = rmvgrp;
      this.clddata.emit(rmvgrp);
      // console.log('removegroup',rmvgrp);
      this.hideModal();
    })
  }
  dltTasks() {
    this.activitiesService.dltTasks(this.selectedchkbxwilldltd).subscribe(rmvTasks => {
      this.removetasks = rmvTasks;
      this.clddata.emit(rmvTasks);
      // console.log('removetasks',rmvTasks);
      this.hideModal();
    })
  }
  dltInstruments() {
    this.settingsService.dltInstruments(this.selectedinstrumentswilldltd).subscribe(dltinstrumentsres => {
      this.dltinstrumentsData = dltinstrumentsres;
      this.clddata.emit(dltinstrumentsres);
      // console.log('dltinstrumentsData',dltinstrumentsres);
      this.hideModal();
    })
  }
  dltWorkflow() {
    this.settingsService.dlttWorkflows(this.willdltwrkflw).subscribe(dltwrkflwRes => {
      this.wrkflwdlt = dltwrkflwRes;
      this.clddata.emit(dltwrkflwRes);
      // console.log('wrkflwdlt', dltwrkflwRes);
      this.hideModal();
    })
  }
  // delete IP
  dltIP() {
    this.settingsService.dltmultipleIP(this.userIdofIP).subscribe(dltIPres => {
      this.ipdlt = dltIPres;
      this.clddata.emit(dltIPres);
      console.log('ipdlt', dltIPres);
      this.hideModal();
    })
  }
  // delete montry transactions
  clrmonetrytransactions() {
    this.activitiesService.dltmonetarytransactions(this.collectionofId).subscribe(clrmnetryTrans => {
      this.deleteemnetrytrans = clrmnetryTrans;
      this.clddata.emit(clrmnetryTrans);
      console.log('deleteemnetrytrans',clrmnetryTrans);
      this.hideModal();
    })
  }
  hideModal() {
this.bsmodal.hide();
  }
}
