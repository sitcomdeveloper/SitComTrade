import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SettingsService } from '../../settings.service';
import { InstrumentsDTO } from '../../settingsDTO';

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
  constructor(private bsmodal: BsModalRef, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    if(this.crtinstrumnts === 'crtinstrumnts') {
      this.createinstruments = true;
    } else {
      this.createinstruments = false;
    }
    if(this.edtinstrmnts === 'edtinstrmnts') {
      this.editinsstrumnts = true;
    } else {
      this.editinsstrumnts = false;
    }
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

      // name: [],
      // displayname
      // groupname
      // spreadtype
      // spreadbid
      // tradeforbidden
      // contractsize
      // leveragename
      // profitcurrency
      // symbolgroup
      // gaplevel
      // tradinghoursid
      // units
    })
  }
  // crt instruments
  createInstruments(addInstruments: InstrumentsDTO) {
    // addInstruments ={

    // }
    this.settingsService.crtInstruments(addInstruments).subscribe(addinstrmnts => {
      this.Instruments = addinstrmnts;
      console.log('Instruments', addinstrmnts);
    })
  }
  hideModal() {
    this.bsmodal.hide();
  }
}
