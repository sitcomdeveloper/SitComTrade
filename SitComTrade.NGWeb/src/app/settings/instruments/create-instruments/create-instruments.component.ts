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
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.InstrumentsForm = this.fb.group({
      name: [],
      displayname: [],
      groupname: [],
      spreadtype: [],
      spreadbid: [],
      tradeforbidden: [],
      contractsize: [],
      leveragename: [],
      profitcurrency: [],
      symbolgroup: [],
      gaplevel: [],
      tradinghoursid: [],
      units: [],
      margincurrency: []
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
      })
    } else {
      this.editinsstrumnts = false;
    }
  }
  // crt instruments
  createInstruments(addInstruments) {
    addInstruments = {
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: 1,
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadType: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: 1,
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrency: this.InstrumentsForm.value.profitcurrency,
      SymbolGroup: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: this.InstrumentsForm.value.tradinghoursid,
      Units: this.InstrumentsForm.value.units,
      // MarginCurrency: this.InstrumentsForm.value.margincurrency
    }
    this.settingsService.crtInstruments(addInstruments).subscribe(addinstrmnts => {
      this.Instruments = addinstrmnts;
      this.clddata.emit(addinstrmnts);
      console.log('Instruments', addinstrmnts);
      this.bsmodal.hide();
    })
  }
  // updt instruments
  uptInstruments(updtInstruments) {
    updtInstruments = {
      Id: this.selectedrowdta.Id,
      Name: this.InstrumentsForm.value.name,
      DisplayName: this.InstrumentsForm.value.displayname,
      GroupId: 1,
      GroupName: this.InstrumentsForm.value.groupname,
      SpreadType: this.InstrumentsForm.value.spreadtype,
      SpreadBid: this.InstrumentsForm.value.spreadbid,
      IsTradeForbidden: this.InstrumentsForm.value.tradeforbidden,
      ContractSize: this.InstrumentsForm.value.contractsize,
      LeverageId: 1,
      LeverageName: this.InstrumentsForm.value.leveragename,
      ProfitCurrency: this.InstrumentsForm.value.profitcurrency,
      SymbolGroup: this.InstrumentsForm.value.symbolgroup,
      GapLevel: this.InstrumentsForm.value.gaplevel,
      TradingHoursId: this.InstrumentsForm.value.tradinghoursid,
      Units: this.InstrumentsForm.value.units,
    }
    this.settingsService.edtInstruments(updtInstruments).subscribe(updtdinstrumnts => {
      this.clddata.emit(updtdinstrumnts);
      this.bsmodal.hide();
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
