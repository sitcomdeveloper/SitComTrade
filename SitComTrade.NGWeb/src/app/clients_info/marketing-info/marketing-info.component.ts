import { Component, OnInit } from '@angular/core';
import { MarketingInfoService } from './marketing-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-marketing-info',
  templateUrl: './marketing-info.component.html',
  styleUrls: ['./marketing-info.component.css']
})
export class MarketingInfoComponent implements OnInit {
  userMarketingInfo: any;
  marketingInfoForm: FormGroup;
  name: any;
  Country: any;
  marketingInfoEdit = false;
  MarketingInfo = true;
  updtdMarketingInfo: any;
  // details: number;
  // detail: number;
  constructor(private marketinginfoservice: MarketingInfoService, private fb: FormBuilder,
              private countryService: CountryService, private spinnerService: Ng4LoadingSpinnerService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.marketingInfoForm = this.fb.group({
      tag1: [''],
      tag2: [''],
      campaignid: [''],
      affilateid: [''],
      subaffilateid: [''],
      source: [''],
      ipaddress: [''],
      referrer: [''],
      ipcountry: [''],
      utmcontent: [''],
      utmsource: [''],
      utmcampaign: [''],
      utmcreative: [''],
      utmmedium: [''],
      googlekeyword: [''],
      afftransactionid: [''],
      affiliateuser: ['']


    });
    this.marketingInfo();
    this.getcountryName();
  }
  marketingInfo() {
    // const details = +this._route.snapshot.paramMap.get('selectedItem');
    // this.detail = details;
    this.marketinginfoservice.getMarketingInfo().subscribe(res => {
      this.userMarketingInfo = res;
      this.marketingInfoForm.patchValue({
        tag1: this.userMarketingInfo.Tag1,
        tag2: this.userMarketingInfo.Tag2,
        campaignid: this.userMarketingInfo.CampaignID,
        affilateid: this.userMarketingInfo.AffiliateID,
        subaffilateid: this.userMarketingInfo.SubAffiliateID,
        source: this.userMarketingInfo.Source,
        ipaddress: this.userMarketingInfo.IPAddress,
        referrer: this.userMarketingInfo.Referrer,
        ipcountry: this.userMarketingInfo.IPCountry,
        utmcontent: this.userMarketingInfo.UtmContent,
        utmsource: this.userMarketingInfo.UtmSource,
      utmcampaign: this.userMarketingInfo.UtmCampaign,
      utmcreative: this.userMarketingInfo.UtmCreative,
      utmmedium: this.userMarketingInfo.UtmMedium,
      googlekeyword: this.userMarketingInfo.GoogleKeyword,
      afftransactionid: this.userMarketingInfo.AffTransactionID,
      affiliateuser: this.userMarketingInfo.AffiliateUser
      });
      console.log('Marketinginfo', res);
    });
  }

  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }
  // pencil
  showhide() {
    this.marketingInfoEdit = true;
    this.MarketingInfo = false;
  }
  // apply btn.update
  closeshowhide() {
    const obj = {
      AffiliateID: this.userMarketingInfo.AffiliateID,
      AffiliateUser: this.marketingInfoForm.value.affiliateuser,
      AffiliateUserId: this.userMarketingInfo.AffiliateUserId,
      AffTransactionID: this.marketingInfoForm.value.afftransactionid,
      CampaignID: this.marketingInfoForm.value.campaignid,
      IPAddress: this.marketingInfoForm.value.ipaddress,
      IPCountry: this.marketingInfoForm.value.ipcountry,
      Referrer: this.marketingInfoForm.value.referrer,
      Source: this.marketingInfoForm.value.source,
      SubAffiliateID: this.marketingInfoForm.value.subaffilateid,
      OwnerId: this.userMarketingInfo.OwnerId,
      Tag1: this.marketingInfoForm.value.tag1,
      Tag2: this.marketingInfoForm.value.tag2,
      UtmCampaign: this.marketingInfoForm.value.utmcampaign,
      UtmContent: this.marketingInfoForm.value.utmcontent,
      UtmCreative: this.marketingInfoForm.value.utmcreative,
      UtmMedium: this.marketingInfoForm.value.utmmedium,
      UtmSource: this.marketingInfoForm.value.utmsource,
      GoogleKeyword: this.marketingInfoForm.value.googlekeyword,
      Id: this.userMarketingInfo.Id
    };
    this.marketinginfoservice.updateMarketingInfo(obj).subscribe(res => {
      this.updtdMarketingInfo = res;
      this.spinnerService.show();
      this.marketingInfo();
      console.log('updtdMarketingInfo', res);
    });
    this.marketingInfoEdit = false;
    this.MarketingInfo = true;
  }
  // cancel btn
  close() {
    this.marketingInfoEdit = false;
    this.MarketingInfo = true;
  }
}
