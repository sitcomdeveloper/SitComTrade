import { Component, OnInit } from '@angular/core';
import { AdditionalInfoService } from './additional-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  userAdditionalInfo: any;
  additionalForm: FormGroup;
  AdditionalInfo = true;
  additionalInfoEdit = false;
  getinsertInfo: any;
  detail: number;

  constructor(private additionalinfoservice: AdditionalInfoService, private fb: FormBuilder,
              private spinnerService: Ng4LoadingSpinnerService, private _route: ActivatedRoute) {  }

  ngOnInit() {
    this.additionalForm = this.fb.group({
      supplieddocs: [''],
      acceptedtermsconditions: [''],
      subscribednewsletter: [''],
      isonline: [''],
      description: [''],
      promocode: ['']
    });
    this.additionalInfo();
  }
  additionalInfo() {
    const details = +this._route.snapshot.paramMap.get('selectedItem');
    this.detail = details;
    this.additionalinfoservice.getAdditionalInfo(details).subscribe(res => {
      if (res !== null && res !== undefined && res !== '') {

      this.userAdditionalInfo = res;
      this.additionalForm.patchValue({
        supplieddocs: this.userAdditionalInfo.SuppliedDocs,
      acceptedtermsconditions: this.userAdditionalInfo.AcceptedTermConditions,
      subscribednewsletter: this.userAdditionalInfo.SubscribedNewsletter,
      isonline: this.userAdditionalInfo.IsOnline,
        description: this.userAdditionalInfo.Description,
        promocode: this.userAdditionalInfo.PromoCode
      });
      console.log('additionalinfo', res);
    }
    });
  }
  // div show hide
  // pencil
  showhide() {
    this.AdditionalInfo = false;
    this.additionalInfoEdit = true;
  }
  // apply.insert additional-info
  saveShowHide() {
    const obj = {
      AcceptedTermConditions: this.additionalForm.value.acceptedtermsconditions,
      Description: this.additionalForm.value.description,
      OwnerId: this.detail,
      IsOnline: this.additionalForm.value.isonline,
      PromoCode: this.additionalForm.value.promocode,
      SubscribedNewsletter: this.additionalForm.value.subscribednewsletter,
      SuppliedDocs: this.additionalForm.value.supplieddocs,
      // Id: this.userAdditionalInfo.Id
    };
    this.additionalinfoservice.insertAdditionalInfo(obj).subscribe(res => {
      this.getinsertInfo = res;
      this.spinnerService.show();
      this.additionalInfo();
      console.log('getinsertInfo', res);
    });
    this.AdditionalInfo = true;
    this.additionalInfoEdit = false;
  }
  // cancel
  cancel() {
    this.AdditionalInfo = true;
    this.additionalInfoEdit = false;
  }


}


