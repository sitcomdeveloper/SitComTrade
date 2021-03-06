import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { InstrumentsDTO } from '../../settingsDTO';
import { ActivatedRoute } from '@angular/router';
import { GroupsService } from '../../groups/groups.service';
import { LoginService } from 'src/app/login/login.service';

@Component({
  selector: 'app-create-instruments',
  templateUrl: './create-instruments.component.html',
  styleUrls: ['./create-instruments.component.css']
})
export class CreateInstrumentsComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();

  crtinstrumnts: any;
  edtinstrmnts: any;
  createinstruments = false;
  editinsstrumnts = false;
  title: any;
  InstrumentsForm: FormGroup
  Instruments: InstrumentsDTO;
  selectedrowdta: any;
  addInstruments: InstrumentsDTO;
  updtInstruments: InstrumentsDTO
  getLoginDetails: any;
  bindLoginData: any;
  spreadtypeenum: any;
  calcultionmodeenum: any;
  symblgroupenum: any;
  swaptypeenum: any;
  tradinghrsenum: any;
  unitsenum: any;
  threedaysswapenum: any;
  margincurrencyEnum: any;
  Group: any;
  getGroupsData: any;
  margincurrencydropdown: any;
  profitcurrrency: any;
  commissioncurrencydropdown: any;

  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService, private _route: ActivatedRoute, private groupsService: GroupsService, private loginservice: LoginService) { }

  ngOnInit() {
    // code for receiving login details and bind to header at place of name
    this.getLoginDetails = JSON.parse(window.sessionStorage.getItem('username'));
    this.bindLoginData = this.getLoginDetails;

    this.InstrumentsForm = this.fb.group({
      name: [''],
      displayname: [''],
      groupname: [''],
      spreadtype: [''],
      spreadbid: [''],
      tradeforbidden: [''],
      contractsize: [''],
      leveragename: [''],
      profitcurrency: [''],
      symbolgroup: [''],
      gaplevel: [''],
      tradinghoursid: [''],
      units: [''],

      margincurrency: [''],
      description: [''],
      spreadask: [''],
      maximalvolume: [''],
      volumestep: [''],
      minimalvolume: [''],
      marginhedge: [''],
      swaplong: [''],
      swapshort: [''],
      stoplevel: [''],
      digits: [''],
      calculationmode: [''],
      commission: [''],
      swaptype: [''],
      threedaysswap: [''],
      commissioncurrency: [''],
      hidden: [''],
      expirationdate: [''],
      disabled: [''],
      groupid: [''],
      spreadtypeid: [''],
      symbolgroupid: [''],
      tradinghours: [''],
      unitsid: [''],
      calculationmodeid: [''],
      swaptypeid: [''],
      threedaysswapid: [''],
      margincurrencyid: ['']
    })
    if (this.crtinstrumnts === 'crtinstrumnts') {
      this.createinstruments = true;
    } else {
      this.createinstruments = false;
    }
    if (this.edtinstrmnts === 'edtinstrmnts') {
      this.editinsstrumnts = true;
      this.InstrumentsForm.patchValue({
        name: this.selectedrowdta.Name,
        displayname: this.selectedrowdta.DisplayName,
        groupname: this.selectedrowdta.GroupName,
        groupid: this.selectedrowdta.GroupId,
        spreadtype: this.selectedrowdta.SpreadTypeName,
        spreadbid: this.selectedrowdta.SpreadBid,
        tradeforbidden: this.selectedrowdta.IsTradeForbidden,
        contractsize: this.selectedrowdta.ContractSize,
        leveragename: this.selectedrowdta.LeverageName,
        profitcurrency: this.selectedrowdta.ProfitCurrencyName,
        symbolgroup: this.selectedrowdta.SymbolGroupName,
        gaplevel: this.selectedrowdta.GapLevel,
        tradinghoursid: this.selectedrowdta.TradingHoursName,
        units: this.selectedrowdta.UnitName,
        margincurrency: this.selectedrowdta.MarginCurrencyName,
        description: this.selectedrowdta.Description,
        spreadask: this.selectedrowdta.SpreadAsk,
        maximalvolume: this.selectedrowdta.MaximalVolume,
        volumestep: this.selectedrowdta.VolumeStep,
        minimalvolume: this.selectedrowdta.MinimalVolume,
        marginhedge: this.selectedrowdta.MarginHedge,
        swaplong: this.selectedrowdta.SwapLong,
        swapshort: this.selectedrowdta.SwapShort,
        stoplevel: this.selectedrowdta.StopLevel,
        digits: this.selectedrowdta.Digits,
        calculationmode: this.selectedrowdta.CalculationModeName,
        commission: this.selectedrowdta.Commission,
        swaptype: this.selectedrowdta.SwapTypeName,
        threedaysswap: this.selectedrowdta.ThreeDaysSwapName,
        commissioncurrency: this.selectedrowdta.CommissionCurrencyName,
        hidden: this.selectedrowdta.Hidden,
        expirationdate: this.selectedrowdta.ExpirationDate,
        disabled: this.selectedrowdta.IsDisabled,
      })
    } else {
      this.editinsstrumnts = false;
    }
    this.spreadtype();
    this.calcultionmode();
    this.symbolgroup();
    this.swaptypes();
    this.tradinghours();
    this.units();
    this.threedaysswap();
    this.margincurrency();
    this.getGroups();
    this.currencyName();
  }
  // spreadtype
  spreadtype() {
    this.settingsService.getSpreadType().subscribe(sprdtypeRes => {
      this.spreadtypeenum = sprdtypeRes;
      // console.log('spreadtypeenum', sprdtypeRes);
    })
  }
  // calculation mode
  calcultionmode() {
    this.settingsService.getCalculationmode().subscribe(calculationmdeRes => {
      this.calcultionmodeenum = calculationmdeRes;
      // console.log('calcultionmodeenum', calculationmdeRes);
    })
  }
  // symbol group
  symbolgroup() {
    this.settingsService.getSymbolgroups().subscribe(symblgrpRes => {
      this.symblgroupenum = symblgrpRes;
      // console.log('symblgroupenum', symblgrpRes);
    })
  }
  // swap types
  swaptypes() {
    this.settingsService.getSwapTypes().subscribe(swaptypeRes => {
      this.swaptypeenum = swaptypeRes;
      // console.log('swaptypeenum', swaptypeRes);
    })
  }
  // trading hrs
  tradinghours() {
    this.settingsService.getTradinghrs().subscribe(tradinghrsRes => {
      this.tradinghrsenum = tradinghrsRes;
      // console.log('tradinghrsenum', tradinghrsRes);
    })
  }
  // get units
  units() {
    this.settingsService.getUnits().subscribe(unitsRes => {
      this.unitsenum = unitsRes;
      // console.log('unitsenum', unitsRes);
    })
  }
  // three days swap
  threedaysswap() {
    this.settingsService.getthreedaysSwap().subscribe(threedaysswapRes => {
      this.threedaysswapenum = threedaysswapRes;
      // console.log('threedaysswapenum', threedaysswapRes);
    }
    )
  }
  margincurrency() {
    this.settingsService.getMarginCurrencyforinstrmnts().subscribe(margincurrencyRes => {
      this.margincurrencyEnum = margincurrencyRes;
      // console.log('margincurrencyEnum', margincurrencyRes);
    })
  }
  // get all groups
  getGroups() {
    this.groupsService.getTradeGroups(this.getGroupsData).subscribe(result => {
      this.Group = result;
    });
  }
  //  get currency
  currencyName() {
    const obj = {}
    this.loginservice.currencyName(obj).subscribe(result => {
      this.profitcurrrency = result;
      this.commissioncurrencydropdown = this.profitcurrrency.filter(commissioncrrncy => {
        if (commissioncrrncy.TypeNameMarginCurrency === null) {
          return commissioncrrncy;
        }
      })
    })
  }
  // crt instruments
  createInstruments() {
    // this.Group.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.groupname) {
    //     this.InstrumentsForm.value.groupid = element.Name;
    //   }
    // });
    // this.spreadtypeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.spreadtype) {
    //     this.InstrumentsForm.value.spreadtypeid = element.Name;
    //   }
    // });
    // this.symblgroupenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.symbolgroup) {
    //     this.InstrumentsForm.value.symbolgroupid = element.Name;
    //   }
    // });
    // this.tradinghrsenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.tradinghoursid) {
    //     this.InstrumentsForm.value.tradinghours = element.Name;
    //   }
    // });
    // this.unitsenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.units) {
    //     this.InstrumentsForm.value.unitsid = element.Name;
    //   }
    // });
    // this.calcultionmodeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.calculationmode) {
    //     this.InstrumentsForm.value.calculationmodeid = element.Name;
    //   }
    // });
    // this.swaptypeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.swaptype) {
    //     this.InstrumentsForm.value.swaptypeid = element.Name;
    //   }
    // });
    // this.threedaysswapenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.threedaysswap) {
    //     this.InstrumentsForm.value.threedaysswapid = element.Name;
    //   }
    // });
    // this.margincurrencyEnum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.margincurrency) {
    //     this.InstrumentsForm.value.margincurrencyid = element.Name;
    //   }
    // });
    this.addInstruments = {
      UserId: this.bindLoginData.UserId,
      Id: '',
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: '',
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadTypeName: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: '',
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrencyName: this.InstrumentsForm.value.profitcurrency,
      SymbolGroupName: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: '',
      UnitName: this.InstrumentsForm.value.units,
      MarginCurrencyName: this.InstrumentsForm.value.margincurrency,
      Description: this.InstrumentsForm.value.description,
      SpreadAsk: this.InstrumentsForm.value.spreadask,
      MaximalVolume: this.InstrumentsForm.value.maximalvolume,
      VolumeStep: this.InstrumentsForm.value.volumestep,
      MinimalVolume: this.InstrumentsForm.value.minimalvolume,
      MarginHedge: this.InstrumentsForm.value.marginhedge,
      SwapLong: this.InstrumentsForm.value.swaplong,
      SwapShort: this.InstrumentsForm.value.swapshort,
      StopLevel: this.InstrumentsForm.value.stoplevel,
      Digits: this.InstrumentsForm.value.digits,
      CalculationModeName: this.InstrumentsForm.value.calculationmode,
      Commission: this.InstrumentsForm.value.commission,
      SwapTypeName: this.InstrumentsForm.value.swaptype,
      ThreeDaysSwapName: this.InstrumentsForm.value.threedaysswap,
      CommissionCurrencyName: this.InstrumentsForm.value.commissioncurrency,
      Hidden: this.InstrumentsForm.value.hidden,
      ExpirationDate: this.InstrumentsForm.value.expirationdate,
      IsDisabled: this.InstrumentsForm.value.disabled,

      SpreadTypeId: '',
      ProfitCurrencyId: '',
      SymbolGroupId: '',
      TradingHoursName: this.InstrumentsForm.value.tradinghoursid,
      UnitId: '',
      MarginCurrencyId: '',
      CalculationModeId: '',
      SwapTypeId: '',
      ThreeDaysSwapId: '',
      CommissionCurrencyId: '',
    }
    this.settingsService.crtInstruments(this.addInstruments).subscribe(addinstrmnts => {
      this.Instruments = addinstrmnts;
      this.clddata.emit(addinstrmnts);
      console.log('Instruments', addinstrmnts);
      this.bsmodal.hide();
    })
  }
  // updt instruments
  uptInstruments() {
    // this.Group.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.groupname) {
    //     this.InstrumentsForm.value.groupid = element.Name;
    //   }
    // });
    // this.spreadtypeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.spreadtype) {
    //     this.InstrumentsForm.value.spreadtypeid = element.Name;
    //   }
    // });
    // this.symblgroupenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.symbolgroup) {
    //     this.InstrumentsForm.value.symbolgroupid = element.Name;
    //   }
    // });
    // this.tradinghrsenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.tradinghoursid) {
    //     this.InstrumentsForm.value.tradinghours = element.Name;
    //   }
    // });
    // this.unitsenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.units) {
    //     this.InstrumentsForm.value.unitsid = element.Name;
    //   }
    // });
    // this.calcultionmodeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.calculationmode) {
    //     this.InstrumentsForm.value.calculationmodeid = element.Name;
    //   }
    // });
    // this.swaptypeenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.swaptype) {
    //     this.InstrumentsForm.value.swaptypeid = element.Name;
    //   }
    // });
    // this.threedaysswapenum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.threedaysswap) {
    //     this.InstrumentsForm.value.threedaysswapid = element.Name;
    //   }
    // });
    // this.margincurrencyEnum.forEach(element => {
    //   if ( element.Id === +this.InstrumentsForm.value.margincurrency) {
    //     this.InstrumentsForm.value.margincurrencyid = element.Name;
    //   }
    // });
    this.updtInstruments = {
      UserId: this.selectedrowdta.UserId,
      Id: this.selectedrowdta.Id,
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: '',
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadTypeName: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: '',
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrencyName: this.InstrumentsForm.value.profitcurrency,
      SymbolGroupName: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: '',
      UnitName: this.InstrumentsForm.value.units,
      MarginCurrencyName: this.InstrumentsForm.value.margincurrency,
      Description: this.InstrumentsForm.value.description,
      SpreadAsk: this.InstrumentsForm.value.spreadask,
      MaximalVolume: this.InstrumentsForm.value.maximalvolume,
      VolumeStep: this.InstrumentsForm.value.volumestep,
      MinimalVolume: this.InstrumentsForm.value.minimalvolume,
      MarginHedge: this.InstrumentsForm.value.marginhedge,
      SwapLong: this.InstrumentsForm.value.swaplong,
      SwapShort: this.InstrumentsForm.value.swapshort,
      StopLevel: this.InstrumentsForm.value.stoplevel,
      Digits: this.InstrumentsForm.value.digits,
      CalculationModeName: this.InstrumentsForm.value.calculationmode,
      Commission: this.InstrumentsForm.value.commission,
      SwapTypeName: this.InstrumentsForm.value.swaptype,
      ThreeDaysSwapName: this.InstrumentsForm.value.threedaysswap,
      CommissionCurrencyName: this.InstrumentsForm.value.commissioncurrency,
      Hidden: this.InstrumentsForm.value.hidden,
      ExpirationDate: this.InstrumentsForm.value.expirationdate,
      IsDisabled: this.InstrumentsForm.value.disabled,

      SpreadTypeId: '',
      ProfitCurrencyId: '',
      SymbolGroupId: '',
      TradingHoursName: this.InstrumentsForm.value.tradinghoursid,
      UnitId: '',
      MarginCurrencyId: '',
      CalculationModeId: '',
      SwapTypeId: '',
      ThreeDaysSwapId: '',
      CommissionCurrencyId: '',
    }
    this.settingsService.edtInstruments(this.updtInstruments).subscribe(updtdinstrumnts => {
      this.clddata.emit(updtdinstrumnts);
      this.bsmodal.hide();
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }
}

