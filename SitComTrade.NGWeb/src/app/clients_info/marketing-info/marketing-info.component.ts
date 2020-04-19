import { Component, OnInit } from '@angular/core';
import { MarketingInfoService } from './marketing-info.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';


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
  constructor(private marketinginfoservice: MarketingInfoService, private fb: FormBuilder, private countryService: CountryService) { this.editMarketingInfo(); }

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

    })
    this.marketingInfo();
    this.getcountryName();
  }
  marketingInfo() {
    this.marketinginfoservice.getMarketingInfo().subscribe(res => {
      this.userMarketingInfo = res;
      console.log('Marketinginfo', res);
    });
  }
  editMarketingInfo() {
    this.marketinginfoservice.getMarketingInfo().subscribe(res => {
      this.userMarketingInfo = res;
      this.marketingInfoForm.patchValue({
        tag1: this.userMarketingInfo.Tag1,
        tag2: this.userMarketingInfo.Tag2,
        campaignid: this.userMarketingInfo.CampaignID,
        // affilateid: this.userMarketingInfo.
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

      })
    })
  }
  getcountryName() {
    this.countryService.countryName(this.name).subscribe(result => {
      this.Country = result;
      console.log('countryname', result);
    });
  }

}
