import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GroupsService } from '../groups.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { CurrencyService } from 'src/app/services/currency.service';
import { SettingsService } from '../../settings.service';
import { InstrumentsDTO } from '../../settingsDTO';
import { CreateItemComponent } from '../create-item/create-item.component';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-groups-info',
  templateUrl: './groups-info.component.html',
  styleUrls: ['./groups-info.component.css']
})
export class GroupsInfoComponent implements OnInit {
  info: number;
  groupDetails: any;
  frontend = true;
  backend = false;
  groupsinfoForm: FormGroup;
  updatedDetails: any;
  getGroupsData: any;
  Group: any;
  groupid: number;
  getAllCurrency: any;
  currencies: any;
  submitted: any;
  f: any;
  Leverage: any;
  value: any;
  groupinfo = false;
  instrumetinfo = false;
  detailsofinstruments: any;
  updtInstruments: InstrumentsDTO
  instrumentsdtlsbyid: number;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private route: ActivatedRoute, private groupService: GroupsService, private fb: FormBuilder, private spinnerService: Ng4LoadingSpinnerService,
    private currencyService: CurrencyService, private settingsService: SettingsService, private modalService: BsModalService) { }
  bsModalRef: BsModalRef;
  ngOnInit() {
    this.groupsinfoForm = this.fb.group({
      names: [''],
      initialdeposit: [''],
      margincall: [''],
      ordercount: [''],
      currency: [''],
      demo: [''],
      stopout: [''],
      allowtrade: [''],
      description: [''],
      leverage: [''],
      mindeposit: [''],
      currencyid: [''],
      leverageid: [''],

      name: [''],
      displayname: [''],
      spreadbid: [''],
      spreadask: [''],
      spreadtype: [''],
      maximalvolume: [''],
      volumestep: [''],
      minimalvolume: [''],
      marginhedge: [''],
      swaplong: [''],
      swapshort: [''],
      stoplevel: [''],
      digits: [''],
      gaplevel: [''],
      calculationmode: [''],
      contractsize: [''],
      commission: [''],
      symbolgroup: [''],
      profitcurrency: [''],
      margincurrency: [''],
      swaptype: [''],
      threedaysswap: [''],
      groupname: [''],
      commissioncurrency: [''],
      tradeforbidden: [''],
      hidden: [''],
      units: [''],
      tradinghoursid: [''],
      expirationdate: [''],
      disabled: [''],
      leveragename: ['']
    });
    // for getting data for general-info
    const val = +this.route.snapshot.paramMap.get('publicid');
    if (val === 1) {
      this.groupinfo = true;
      this.instrumetinfo = false;
      const info = +this.route.snapshot.paramMap.get('setItem');
      this.groupid = info;
      // console.log(info);
      this.groupService.getGroupDetails(info).subscribe(res => {
        this.groupDetails = res;
        // console.log('groupDetails', res);
        this.groupsinfoForm.patchValue({
          names: this.groupDetails.Name,
          initialdeposit: this.groupDetails.InitialDeposit,
          margincall: this.groupDetails.MarginCall,
          ordercount: this.groupDetails.OrderCount,
          currency: this.groupDetails.CurrencyName,
          demo: this.groupDetails.Demo,
          stopout: this.groupDetails.StopOut,
          allowtrade: this.groupDetails.AllowTrade,
          description: this.groupDetails.Description,
          leverage: this.groupDetails.LeverageName,
          mindeposit: this.groupDetails.MinDeposit

        });
      });
    }
    else {
      const instrumentsdetails = +this.route.snapshot.paramMap.get('setItem');
      this.instrumentsdtlsbyid = instrumentsdetails;
      this.instrumetinfo = true;
      this.groupinfo = false;
      this.settingsService.getintrumentsId(instrumentsdetails).subscribe(getinstrmntsdtls => {
        this.detailsofinstruments = getinstrmntsdtls;
        this.groupsinfoForm.patchValue({
          name: this.detailsofinstruments.Name,
          displayname: this.detailsofinstruments.DisplayName,
          groupname: this.detailsofinstruments.GroupName,
          spreadtype: this.detailsofinstruments.SpreadType,
          spreadbid: this.detailsofinstruments.SpreadBid,
          tradeforbidden: this.detailsofinstruments.IsTradeForbidden,
          contractsize: this.detailsofinstruments.ContractSize,
          leveragename: this.detailsofinstruments.LeverageName,
          profitcurrency: this.detailsofinstruments.ProfitCurrency,
          symbolgroup: this.detailsofinstruments.SymbolGroup,
          gaplevel: this.detailsofinstruments.GapLevel,
          tradinghoursid: this.detailsofinstruments.TradingHoursId,
          units: this.detailsofinstruments.Units,
          margincurrency: this.detailsofinstruments.MarginCurrency,
        description: this.detailsofinstruments.Description,
        spreadask: this.detailsofinstruments.SpreadAsk,
        maximalvolume: this.detailsofinstruments.MaximalVolume,
        volumestep: this.detailsofinstruments.VolumeStep,
        minimalvolume: this.detailsofinstruments.MinimalVolume,
        marginhedge: this.detailsofinstruments.MarginHedge,
        swaplong: this.detailsofinstruments.SwapLong,
        swapshort: this.detailsofinstruments.SwapShort,
        stoplevel: this.detailsofinstruments.StopLevel,
        digits: this.detailsofinstruments.Digits,
        calculationmode: this.detailsofinstruments.CalculationMode,
        commission: this.detailsofinstruments.Commission,
        swaptype: this.detailsofinstruments.SwapType,
        threedaysswap: this.detailsofinstruments.ThreeDaysSwap,
        commissioncurrency: this.detailsofinstruments.CommissionCurrency,
        hidden: this.detailsofinstruments.Hidden,
        expirationdate: this.detailsofinstruments.ExpirationDate,
        disabled: this.detailsofinstruments.IsDisabled,
        })
        console.log('detailsofinstruments', getinstrmntsdtls);
      })
    }
    this.currency();
    this.getLeverages();
  }
  // hide front div and show back div(by click on pencil)
  hideshow() {
    this.frontend = false;
    this.backend = true;
  }
  // back to front div by click on cancel
  closehideshow() {
    this.frontend = true;
    this.backend = false;
  }
  currency() {
    this.currencyService.currencyName(this.currencies).subscribe(res => {
      this.getAllCurrency = res;
      // console.log('currency', res);
    });
  }
  getGroups() {
    this.groupService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result.reverse();
      // console.log('getGroup', result);
    });
  }
  // updateGroupDetails
  updateGroupDetails() {
    this.getAllCurrency.forEach(element => {
      if (element.Id === +this.groupsinfoForm.value.currency) {
        this.groupsinfoForm.value.currencyid = element.Name;
      }
    });
    this.Leverage.forEach(element => {
      if (element.Id === +this.groupsinfoForm.value.leverage) {
        this.groupsinfoForm.value.leverageid = element.Name;
      }
    });
    const obj = {
      Id: this.groupDetails.Id,
      Name: this.groupsinfoForm.value.names,
      Description: this.groupsinfoForm.value.description,
      InitialDeposit: this.groupsinfoForm.value.initialdeposit,
      StopOut: this.groupsinfoForm.value.stopout,
      MarginCall: this.groupsinfoForm.value.margincall,
      OrderCount: this.groupsinfoForm.value.ordercount,
      Demo: this.groupsinfoForm.value.demo,
      MinDeposit: this.groupsinfoForm.value.mindeposit,
      AllowTrade: this.groupsinfoForm.value.allowtrade,
      CurrencyId: this.groupsinfoForm.value.currency,
      CurrencyName: this.groupsinfoForm.value.currencyid,
      LeverageId: this.groupsinfoForm.value.leverage,
      LeverageName: this.groupsinfoForm.value.leverageid,
      UserId: this.groupDetails.UserId
    };
    this.groupService.updateGroup(obj).subscribe(res => {
      this.updatedDetails = res;
      this.updateshowonPage();
      this.frontend = true;
      this.backend = false;

      this.spinnerService.show();
      // console.log('updatedDetails', res);
    });
  }
  // after update again call the method for refresh the details on groups-info page.same API call
  // which take data from groups pg. to groups-info pg.
  updateshowonPage() {
    this.groupService.getGroupDetails(this.groupid).subscribe(res => {
      this.groupDetails = res;
    });
  }
  // get Leverages
  getLeverages() {
    this.groupService.getAllLverages().subscribe(rspnse => {
      this.Leverage = rspnse;
    });
  }
  // updt instruments
  uptInstruments() {
    this.updtInstruments = {
      UserId: this.detailsofinstruments.UserId,
      Id: this.detailsofinstruments.Id,
      Name: this.groupsinfoForm.value.name,
      DisplayName: this.groupsinfoForm.value.displayname,
      GroupId: '',
      GroupName: this.groupsinfoForm.value.groupname,
      SpreadTypeName: this.groupsinfoForm.value.spreadtype,
      SpreadBid: this.groupsinfoForm.value.spreadbid,
      IsTradeForbidden: this.groupsinfoForm.value.tradeforbidden,
      ContractSize: this.groupsinfoForm.value.contractsize,
      LeverageId: '',
      LeverageName: this.groupsinfoForm.value.leveragename,
      ProfitCurrencyName: this.groupsinfoForm.value.profitcurrency,
      SymbolGroupName: this.groupsinfoForm.value.symbolgroup,
      GapLevel: this.groupsinfoForm.value.gaplevel,
      TradingHoursId: '',
      UnitName: this.groupsinfoForm.value.units,
      MarginCurrencyName: this.groupsinfoForm.value.margincurrency,
      Description: this.groupsinfoForm.value.description,
      SpreadAsk: this.groupsinfoForm.value.spreadask,
      MaximalVolume: this.groupsinfoForm.value.maximalvolume,
      VolumeStep: this.groupsinfoForm.value.volumestep,
      MinimalVolume: this.groupsinfoForm.value.minimalvolume,
      MarginHedge: this.groupsinfoForm.value.marginhedge,
      SwapLong: this.groupsinfoForm.value.swaplong,
      SwapShort: this.groupsinfoForm.value.swapshort,
      StopLevel: this.groupsinfoForm.value.stoplevel,
      Digits: this.groupsinfoForm.value.digits,
      CalculationModeName: this.groupsinfoForm.value.calculationmode,
      Commission: this.groupsinfoForm.value.commission,
      SwapTypeName: this.groupsinfoForm.value.swaptype,
      ThreeDaysSwapName: this.groupsinfoForm.value.threedaysswap,
      CommissionCurrencyName: this.groupsinfoForm.value.commissioncurrency,
      Hidden: this.groupsinfoForm.value.hidden,
      ExpirationDate: this.groupsinfoForm.value.expirationdate,
      IsDisabled: this.groupsinfoForm.value.disabled,

      SpreadTypeId: '',
      ProfitCurrencyId: '',
      SymbolGroupId: '',
      TradingHoursName: this.groupsinfoForm.value.tradinghoursid,
      UnitId: '',
      MarginCurrencyId: '',
      CalculationModeId: '',
      SwapTypeId: '',
      ThreeDaysSwapId: '',
      CommissionCurrencyId: '',
    }
    this.settingsService.edtInstruments(this.updtInstruments).subscribe(updtdinstrumnts => {
      this.afterupdateInstruments();
      this.frontend = true;
      this.backend = false;
    })
  }
  afterupdateInstruments() {
    this.settingsService.getintrumentsId(this.instrumentsdtlsbyid).subscribe(getinstrmntsdtls => {
      this.detailsofinstruments = getinstrmntsdtls;
    });
  }
  // group view history popup
  groupsViewHistorypopup() {
    const initialState = {
      title: 'View History',
      grpviewhistry: 'grpviewhistry'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateItemComponent, Object.assign({ show: true }, { class: 'modal1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
  // instruments view history popup
  instrumentsViewHistorypopup() {
    const initialState = {
      title: 'View History',
      instrmntsviewhistry: 'instrmntsviewhistry'
    };
    // tslint:disable-next-line: max-line-length
    this.bsModalRef = this.modalService.show(CreateItemComponent, Object.assign({ show: true }, { class: 'modal1250', initialState }));
    this.bsModalRef.content.closeBtnName = 'Cancel';
  }
}
