import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateEditWoorkflowsComponent } from './create-edit-woorkflows/create-edit-woorkflows.component';
import { SettingsService } from '../settings.service';
import { Workflows } from '../settingsDTO';
import { DeleteComponent } from 'src/app/common/delete/delete.component';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {
  gtwrkflws: Workflows;
  allWorkflows: Workflows;

  constructor(private modalService: BsModalService, private settingsService: SettingsService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.getallWorkflows();
  }
  getallWorkflows() {
    this.settingsService.getWorkflows(this.gtwrkflws).subscribe(workflows => {
      this.allWorkflows = workflows;
      // console.log('allWorkflows',workflows);
    })
  }
  opencrtworkflow() {
    const initialState = {
      title: 'Create Workflow',
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateEditWoorkflowsComponent, Object.assign({  show: true }, { class: 'modal650', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(() => {
      this.getallWorkflows();
    });
  }
  opendltworkflow(slctdwrkflwId) {
    const initialState = {
      title: 'Delete Item',
      rmvWorkflow: 'rmvWorkflow',
      willdltwrkflw: slctdwrkflwId
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(DeleteComponent, Object.assign({ show: true }, { class: 'modal450', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
    this.bsModalRef.content.clddata.subscribe(data => {
      this.getallWorkflows();
    });
  }
}
