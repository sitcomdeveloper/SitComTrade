import { Component, OnInit } from '@angular/core';
import { AdditionalInfoService } from './additional-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  userAdditionalInfo:any;
  additionalForm: FormGroup
  constructor(private additionalinfoservice: AdditionalInfoService,private fb: FormBuilder) {this.editAdditionalInfo(); }

  ngOnInit() {
    this.additionalForm = this.fb.group({
      supplieddocs: [''],
      acceptedtermsconditions: [''],
      subscribednewsletter: [''],
      isonline: [''],
      description: ['']
    })
    this.additionalInfo();
  }
  additionalInfo(){
    this.additionalinfoservice.getAdditionalInfo().subscribe(res =>{
      this.userAdditionalInfo = res;
      console.log('additionalinfo',res);
    });
  }
  editAdditionalInfo() {
    this.additionalinfoservice.getAdditionalInfo().subscribe(res =>{
      this.userAdditionalInfo = res;
      this.additionalForm.patchValue({
        supplieddocs: this.userAdditionalInfo.SuppliedDocs,
        acceptedtermsconditions: this.userAdditionalInfo.AcceptedTermConditions,
      subscribednewsletter: this.userAdditionalInfo.SubscribedNewsletter,
      isonline: this.userAdditionalInfo.IsOnline,
      description: this.userAdditionalInfo.Description
      })
    })
  }

}


