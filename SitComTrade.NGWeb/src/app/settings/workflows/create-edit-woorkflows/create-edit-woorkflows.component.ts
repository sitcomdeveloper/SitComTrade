import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { Workflows, IpDTO } from '../../settingsDTO';

@Component({
  selector: 'app-create-edit-woorkflows',
  templateUrl: './create-edit-woorkflows.component.html',
  styleUrls: ['./create-edit-woorkflows.component.css']
})
export class CreateEditWoorkflowsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  workflowsForm: FormGroup
  addwrkflw: Workflows;
  updtWorkflw: Workflows
  newWorkflow: Workflows;
  bindLoginData: any;
  getLoginDetails: any;
  editworkflow = false;
  createworkflow = false;
  crtwrkflw: string;
  edtwrkflw: string;
  patchthevalue: any;
  editIPwhitelistsection = false;
  editIP: string;
  selectedipdata: any;
  updateIP: IpDTO;
  UpdatedIP: IpDTO;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    this.workflowsForm = this.fb.group({
      workflowname: [''],
      enabled: [''],
      module: [''],
      event: [''],
      ip: [''],
      description: ['']
    })
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;
    //  crt wrkflw
     if(this.crtwrkflw === 'crtwrkflw') {
       this.createworkflow = true;
     } else {
       this.createworkflow = false;
     }
    //  edt wrkflw
    if(this.edtwrkflw === 'edtwrkflw') {
      this.editworkflow = true;
      this.workflowsForm.patchValue({
        workflowname: this.patchthevalue.Name,
        event: this.patchthevalue.Event,
        module: this.patchthevalue.ModuleName,
        enabled: this.patchthevalue.IsEnabled,
      })
    } else {
      this.editworkflow = false;
    }
    // edt IP
    if(this.editIP === 'editIP') {
      this.editIPwhitelistsection = true;
      this.workflowsForm.patchValue({
        ip: this.selectedipdata.IPAddress,
        description: this.selectedipdata.Description,
      })
    } else {
      this.editIPwhitelistsection = false
    }
  }  
  // crt workflow
crttheWorkflow() {
   this.addwrkflw ={
     Id: '',
    Name: this.workflowsForm.value.workflowname,
    Event: this.workflowsForm.value.event,
    UserId: this.bindLoginData.UserId,
    UserName: this.bindLoginData.FullName,
    ModuleId: 1,
    ModuleName: this.workflowsForm.value.module,                          
    IsEnabled: this.workflowsForm.value.enabled
  }
  this.settingsService.crtWorkflow(this.addwrkflw).subscribe(getcrtdWorkflow => {
    this.newWorkflow = getcrtdWorkflow;
    this.clddata.emit(getcrtdWorkflow);
    // console.log('newWorkflow',getcrtdWorkflow);
    this.bsmodal.hide();
  })
}
updtetheWorkflow() {
  this.updtWorkflw ={
    Id: this.patchthevalue.Id,
    Name: this.workflowsForm.value.workflowname,
    Event: this.workflowsForm.value.event,
    UserId: this.bindLoginData.UserId,
    UserName: this.bindLoginData.FullName,
    ModuleId: this.patchthevalue.ModuleId,
    ModuleName: this.workflowsForm.value.module,
    IsEnabled: this.workflowsForm.value.enabled
  }
  this.settingsService.edtWorkflow(this.updtWorkflw).subscribe(getupdtWorkflw => {
    this.clddata.emit(getupdtWorkflw);
    console.log('updatedWorkflow', getupdtWorkflw);
    this.bsmodal.hide();
  })
}
// update the IPWHITE LIST
edtIPWhiteList() {
  this.updateIP = {
    Id: this.selectedipdata.Id,
    IPAddress: this.workflowsForm.value.ip,
    Description: this.workflowsForm.value.description,
    UserId: this.selectedipdata.UserId
  }
  this.settingsService.updtIp(this.updateIP).subscribe(modifiedIp => {
    this.UpdatedIP = modifiedIp;
    this.clddata.emit(modifiedIp);
    this.bsmodal.hide();
    //  console.log('UpdatedIP',modifiedIp);
  })
}
  hideModal() {
    this.bsmodal.hide();
  }

}
