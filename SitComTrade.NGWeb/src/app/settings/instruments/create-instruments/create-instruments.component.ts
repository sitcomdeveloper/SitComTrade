import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { InstrumentsDTO } from '../../settingsDTO';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService, private _route: ActivatedRoute) { }

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
        spreadtype: this.selectedrowdta.SpreadType,
        spreadbid: this.selectedrowdta.SpreadBid,
        tradeforbidden: this.selectedrowdta.IsTradeForbidden,
        contractsize: this.selectedrowdta.ContractSize,
        leveragename: this.selectedrowdta.LeverageName,
        profitcurrency: this.selectedrowdta.ProfitCurrency,
        symbolgroup: this.selectedrowdta.SymbolGroup,
        gaplevel: this.selectedrowdta.GapLevel,
        tradinghoursid: this.selectedrowdta.TradingHoursId,
        units: this.selectedrowdta.Units,
        margincurrency: this.selectedrowdta.MarginCurrency,
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
        calculationmode: this.selectedrowdta.CalculationMode,
        commission: this.selectedrowdta.Commission,
        swaptype: this.selectedrowdta.SwapType,
        threedaysswap: this.selectedrowdta.ThreeDaysSwap,
        commissioncurrency: this.selectedrowdta.CommissionCurrency,
        hidden: this.selectedrowdta.Hidden,
        expirationdate: this.selectedrowdta.ExpirationDate,
        disabled: this.selectedrowdta.IsDisabled,
      })
    } else {
      this.editinsstrumnts = false;
    }
  }
  // crt instruments
  createInstruments() {
    this.addInstruments = {
      UserId: this.bindLoginData.UserId,
      Id: '',
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: '',
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadType: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: '',
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrency: this.InstrumentsForm.value.profitcurrency,
      SymbolGroup: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: this.InstrumentsForm.value.tradinghoursid,
      Units: this.InstrumentsForm.value.units,
      MarginCurrency: this.InstrumentsForm.value.margincurrency,
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
      CalculationMode: this.InstrumentsForm.value.calculationmode,
      Commission: this.InstrumentsForm.value.commission,
      SwapType: this.InstrumentsForm.value.swaptype,
      ThreeDaysSwap: this.InstrumentsForm.value.threedaysswap,
      CommissionCurrency: this.InstrumentsForm.value.commissioncurrency,
      Hidden: this.InstrumentsForm.value.hidden,
      ExpirationDate: this.InstrumentsForm.value.expirationdate,
      IsDisabled: this.InstrumentsForm.value.disabled,
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
    this.updtInstruments = {
      UserId: this.selectedrowdta.UserId,
      Id: this.selectedrowdta.Id,
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: '',
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadType: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: '',
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrency: this.InstrumentsForm.value.profitcurrency,
      SymbolGroup: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: this.InstrumentsForm.value.tradinghoursid,
      Units: this.InstrumentsForm.value.units,
      MarginCurrency: this.InstrumentsForm.value.margincurrency,
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
      CalculationMode: this.InstrumentsForm.value.calculationmode,
      Commission: this.InstrumentsForm.value.commission,
      SwapType: this.InstrumentsForm.value.swaptype,
      ThreeDaysSwap: this.InstrumentsForm.value.threedaysswap,
      CommissionCurrency: this.InstrumentsForm.value.commissioncurrency,
      Hidden: this.InstrumentsForm.value.hidden,
      ExpirationDate: this.InstrumentsForm.value.expirationdate,
      IsDisabled: this.InstrumentsForm.value.disabled,
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
