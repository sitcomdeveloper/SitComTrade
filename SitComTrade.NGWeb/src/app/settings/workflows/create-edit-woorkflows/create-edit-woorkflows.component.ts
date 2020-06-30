import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { Workflows } from '../../settingsDTO';

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
  // addwrkflw: Workflows;
  newWorkflow: Workflows;
  bindLoginData: any;
  getLoginDetails: any;
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
     // code for receiving login details and bind to header at place of name
     this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
     this.bindLoginData = this.getLoginDetails;
     
    this.workflowsForm = this.fb.group({
      workflowname: [''],
      enabled: [''],
      module: [''],
      event: [''],
    })
  }  
  // crt workflow
crttheWorkflow(addwrkflw: Workflows) {
   addwrkflw ={
    Name: this.workflowsForm.value.workflowname,
    Event: this.workflowsForm.value.event,
    UserId: this.bindLoginData.UserId,
    UserName: this.bindLoginData.FullName,
    ModuleId: 1,
    ModuleName: this.workflowsForm.value.module,                          
    IsEnabled: this.workflowsForm.value.enabled
  }
  this.settingsService.crtWorkflow(addwrkflw).subscribe(getcrtdWorkflow => {
    this.newWorkflow = getcrtdWorkflow;
    this.clddata.emit(getcrtdWorkflow);
    // console.log('newWorkflow',getcrtdWorkflow);
    this.bsmodal.hide();
  })
}
  hideModal() {
    this.bsmodal.hide();
  }

}
