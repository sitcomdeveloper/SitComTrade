import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-crmnewuser',
  templateUrl: './crmnewuser.component.html',
  styleUrls: ['./crmnewuser.component.css']
})
export class CrmnewuserComponent implements OnInit {
  @Input() prtdata: any;
  @Output() clddata: EventEmitter<any> = new EventEmitter();
  title: any;
  Desks: any;
  Departments: any;
  TimeZones: any;
  CultureCode: any;
  Roles: any;
  SenderSettings: any;
  Modules: any;
  Clients: any;
  Activities: any;
  Settings: any;
  Reports: any;

  constructor(private bsmodal: BsModalRef, private settingsService: SettingsService) { }

  ngOnInit() {
    this.getDesks();
    this.getDepartments();
    this.getTimeZone();
    this.getCultureCodes();
    this.getRoles();
    this.getSenderSettings();
    this.getModules();
  }
  hideModal() {
    this.bsmodal.hide();
  }
  getDesks() {
    this.settingsService.getAllDesks().subscribe(desks => {
      this.Desks = desks;
      console.log('Desks', desks);
    })
  }
  getDepartments() {
    this.settingsService.getAllDepartments().subscribe(departments => {
      this.Departments = departments;
      console.log('Departments', departments);
    })
  }
  getTimeZone() {
    this.settingsService.getAllTimeZones().subscribe(timezone => {
      this.TimeZones = timezone;
      console.log('TimeZones', timezone);
    })
  }
  getCultureCodes() {
    this.settingsService.getAllCultureCodes().subscribe(cultrecode => {
      this.CultureCode = cultrecode;
      console.log('CultureCode', cultrecode);
    })
  }
  getRoles() {
    this.settingsService.getAllRoles().subscribe(roles =>{
      this.Roles = roles;
      console.log('Roles', roles);
    })
  }
  getSenderSettings() {
    this.settingsService.getAllRoles().subscribe(sndrsettings => {
      this.SenderSettings = sndrsettings;
      console.log('SenderSettings', sndrsettings);
    })
  }
  getModules() {
    this.settingsService.getAllModules().subscribe(modules => {
      this.Modules = modules;
      this.Clients = this.Modules.filter(clients => {
        if(clients.ModuleGroupId === '1') {
          return clients;
        }
      })
      this.Activities = this.Modules.filter(activities => {
        if(activities.ModuleGroupId === '2') {
          return activities;
        }
      })
      this.Reports = this.Modules.filter(reports => {
        if(reports.ModuleGroupId === '3') {
          return reports;
        }
      })
      this.Settings = this.Modules.filter(settings => {
        if(settings.ModuleGroupId === '4') {
          return settings;
        }
      })

      console.log('Modules', modules);
    })
  }
  // Clients = this.Modules.filter(({ ModuleGroupId }) => ModuleGroupId === '1');
  // Activities = this.Modules.filter(({ ModuleGroupId }) => ModuleGroupId === '2');
  // Reports = this.Modules.filter(({ ModuleGroupId }) => ModuleGroupId === '3');
  // Settings = this.Modules.filter(({ ModuleGroupId }) => ModuleGroupId === '4');
}
