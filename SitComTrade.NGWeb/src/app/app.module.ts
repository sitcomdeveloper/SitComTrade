import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './common/directives/phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TabModule} from 'angular-tabs-component';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
// import { CollapsibleModule } from 'angular2-collapsible';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';


import { AgGridModule } from 'ag-grid-angular';
import { AuthpipePipe } from './authpipe.pipe';


import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './header/logo/logo.component';
import { ClientsComponent } from './header/clients/clients.component';
import { ActivitiesComponent } from './header/activities/activities.component';
import { ReportsComponent } from './header/reports/reports.component';
import { SettingsComponent } from './header/settings/settings.component';
import { TimeComponent } from './header/time/time.component';
import { SearchComponent } from './header/search/search.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { UserComponent } from './header/user/user.component';
import { ClientComponent } from './clients/client/client.component';
import { TradeaccountsComponent } from './clients/tradeaccounts/tradeaccounts.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './reports/dashboard/dashboard.component';
import { ExposureComponent } from './reports/exposure/exposure.component';
import { LeaderboardComponent } from './reports/leaderboard/leaderboard.component';
import { ReportComponent } from './reports/report/report.component';
import { TradingjournalsComponent } from './reports/tradingjournals/tradingjournals.component';
import { BenchmarkComponent } from './reports/benchmark/benchmark.component';
import { MonetarytransactionsComponent } from './activities/monetarytransactions/monetarytransactions.component';
import { TasksComponent } from './activities/tasks/tasks.component';
import { CasesComponent } from './activities/cases/cases.component';
import { DocumentsComponent } from './activities/documents/documents.component';
import { OpenedordersComponent } from './activities/openedorders/openedorders.component';
import { ClosedordersComponent } from './activities/closedorders/closedorders.component';
import { PendingordersComponent } from './activities/pendingorders/pendingorders.component';
import { RejectedtransactionComponent } from './activities/rejectedtransaction/rejectedtransaction.component';
import { CommonjournalComponent } from './activities/commonjournal/commonjournal.component';
import { EmailtemplatesComponent } from './settings/emailtemplates/emailtemplates.component';
import { SendersettingsComponent } from './settings/sendersettings/sendersettings.component';
import { GroupsComponent } from './settings/groups/groups.component';
import { InstrumentsComponent } from './settings/instruments/instruments.component';
import { TranslationsComponent } from './settings/translations/translations.component';
import { FiltersComponent } from './settings/filters/filters.component';
import { ImportsComponent } from './settings/imports/imports.component';
import { CrmusersComponent } from './settings/crmusers/crmusers.component';
import { AffilateusersComponent } from './settings/affilateusers/affilateusers.component';
import { AdditionalfieldsComponent } from './settings/additionalfields/additionalfields.component';
import { ModulefieldsComponent } from './settings/modulefields/modulefields.component';
import { IplistComponent } from './settings/iplist/iplist.component';
import { TradinghoursComponent } from './settings/tradinghours/tradinghours.component';
import { WorkflowsComponent } from './settings/workflows/workflows.component';

import { AccountsComponent } from './clients/accounts/accounts.component';
import { AllComponent } from './clients/all/all.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TermsComponent } from './terms/terms.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
// clients-info component
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { GeneralInfoComponent } from './clients_info/general-info/general-info.component';
import { CommentsComponent } from './clients_info/comments/comments.component';
import { MarketingInfoComponent } from './clients_info/marketing-info/marketing-info.component';
import { AddressComponent } from './clients_info/address/address.component';

import { AdditionalInfoComponent } from './clients_info/additional-info/additional-info.component';
import { EmailComponent } from './clients_info/email/email.component';
import { SmsComponent } from './clients_info/sms/sms.component';
import { RegHisComponent } from './clients_info/reg-his/reg-his.component';
import { TasksInfoComponent } from './clients_info/tasks-info/tasks-info.component';
import { ItemComponent } from './clients/item/item.component';
import { ImportClientComponent } from './clients/import-client/import-client.component';
import { ExportClientComponent } from './clients/export-client/export-client.component';
import { SmsAllComponent } from './clients/sms-all/sms-all.component';
import { EmailAllComponent } from './clients/email-all/email-all.component';
import { ImportClientDataComponent } from './clients/import-client-data/import-client-data.component';
import { CreateTaskComponent } from './clients_info/tasks-info/create-task/create-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LogoComponent,
    ClientsComponent,
    ActivitiesComponent,
    ReportsComponent,
    SettingsComponent,
    TimeComponent,
    SearchComponent,
    NotificationsComponent,
    UserComponent,
    ClientComponent,
    TradeaccountsComponent,
    LoginComponent,
    AuthpipePipe,
    DashboardComponent,
    ExposureComponent,
    LeaderboardComponent,
    ReportComponent,
    TradingjournalsComponent,
    BenchmarkComponent,
    MonetarytransactionsComponent,
    TasksComponent,
    CasesComponent,
    DocumentsComponent,
    OpenedordersComponent,
    ClosedordersComponent,
    PendingordersComponent,
    RejectedtransactionComponent,
    CommonjournalComponent,
    EmailtemplatesComponent,
    SendersettingsComponent,
    GroupsComponent,
    InstrumentsComponent,
    TranslationsComponent,
    FiltersComponent,
    ImportsComponent,
    CrmusersComponent,
    AffilateusersComponent,
    AdditionalfieldsComponent,
    ModulefieldsComponent,
    IplistComponent,
    TradinghoursComponent,
    WorkflowsComponent,
    
    AccountsComponent,
    AllComponent,
    TermsComponent,
    RegisterComponent,
    BlockCopyPasteDirective,
    FooterComponent,
    ClientsInfoComponent,
    GeneralInfoComponent,
    CommentsComponent,
    MarketingInfoComponent,
    AddressComponent,
    // AdditionalFieldsComponent,
    AdditionalInfoComponent,
    EmailComponent,
    SmsComponent,
    RegHisComponent,
    // TasksInfoComponent
    PhoneMaskDirective,
    TasksInfoComponent,
    ItemComponent,
    ImportClientComponent,
    ExportClientComponent,
    SmsAllComponent,
    EmailAllComponent,
    ImportClientDataComponent,
    CreateTaskComponent,
    
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,
    AgGridModule.withComponents(null),
    TabModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],  
  exports: [
    PhoneMaskDirective
  ],
  providers: [AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
