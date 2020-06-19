import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthInterceptor } from '../app/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PhoneMaskDirective } from './common/directives/phone-mask.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockCopyPasteDirective } from './block-copy-paste.directive';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthpipePipe } from './authpipe.pipe';
import { ModalModule, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HeaderComponent } from './header/header.component';
import { ClientsComponent } from './header/clients/clients.component';
// tslint:disable-next-line: max-line-length
import {ClientComponent, TradeaccountsComponent, EmailAllComponent, ExportClientComponent, ImportClientComponent, ItemComponent,
  SmsAllComponent, ImprtclntdtaComponent, ImportClientDataComponent, LiveDetailComponent} from './clients';
// tslint:disable-next-line: max-line-length
import {BenchmarkComponent, DashboardComponent, ExposureComponent, LeaderboardComponent, ReportComponent, TradingjournalsComponent} from './reports';
// tslint:disable-next-line: max-line-length
import {MonetarytransactionsComponent, TasksComponent, CasesComponent, DocumentsComponent, OpenedordersComponent, ClosedordersComponent, PendingordersComponent, RejectedtransactionComponent, CommonjournalComponent, OoinfoComponent } from './activities';
import { ActivitiesComponent } from './header/activities/activities.component';
import { ReportsComponent } from './header/reports/reports.component';
import { SettingsComponent } from './header/settings/settings.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.guard';
import { TermsComponent } from './terms/terms.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
// clients-info component
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import {GeneralInfoComponent, CommentsComponent, MarketingInfoComponent, AddressComponent, AdditionalInfoComponent, EmailComponent,
  // tslint:disable-next-line: max-line-length
  SmsComponent, RegHisComponent, TasksInfoComponent, CreateTaskComponent,EditTaskComponent, InfoCasesComponent, InfoDocumentsComponent, TradeAccountsComponent, FinancialTransactionsComponent, ActcrtaccComponent} from './clients_info';
import { CreateTemplateComponent } from './settings/emailtemplates/create-template/create-template.component';
import { EditTemplateComponent } from './settings/emailtemplates/edit-template/edit-template.component';
import { DeleteComponent } from './common/delete/delete.component';
import {EmailtemplatesComponent, SendersettingsComponent, GroupsComponent, InstrumentsComponent,
  TranslationsComponent, FiltersComponent, ImportsComponent, CrmusersComponent, AffilateusersComponent, AdditionalfieldsComponent,
  // tslint:disable-next-line: max-line-length
  ModulefieldsComponent, IplistComponent, TradinghoursComponent, WorkflowsComponent, CreateItemComponent, GroupsInfoComponent, CrmnewuserComponent, CrmedituserComponent, AffilatenewuserComponent, TranslationsFilterComponent, ImportedClientsComponent} from './settings';
import { SrchPipe } from './clients/client/srch.pipe';
import { UserdetailsComponent } from './header/userdetails/userdetails.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    ActivitiesComponent,
    ReportsComponent,
    SettingsComponent,
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
    CreateTaskComponent,
    CreateTemplateComponent,
    EditTemplateComponent,
    CreateItemComponent,
    TradeAccountsComponent,
    FinancialTransactionsComponent,
    DeleteComponent,
    EditTaskComponent,
    InfoDocumentsComponent,
    InfoCasesComponent,
    GroupsInfoComponent,
    TranslationsFilterComponent,
    ImportedClientsComponent,
    LiveDetailComponent,
    SrchPipe,
    OoinfoComponent,
    CrmnewuserComponent,
    UserdetailsComponent,
    CrmedituserComponent,
    ActcrtaccComponent,
    ImprtclntdtaComponent,
    ImportClientDataComponent,
    AffilatenewuserComponent,
  ],
  imports: [
    BrowserModule,
    // BrowserAnimationsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AppRoutingModule, FormsModule, ReactiveFormsModule,
    // TabModule,
    Ng4LoadingSpinnerModule.forRoot(),
    PopoverModule.forRoot(), TooltipModule.forRoot(), CollapseModule.forRoot(), CKEditorModule, BsDatepickerModule.forRoot(), BrowserAnimationsModule
  ],
  entryComponents: [ItemComponent, DeleteComponent, EditTaskComponent, CreateTaskComponent, CreateItemComponent,
     // tslint:disable-next-line: max-line-length
     CreateTemplateComponent, TranslationsFilterComponent, CommentsComponent, CrmnewuserComponent, UserdetailsComponent, CrmedituserComponent,
     ActcrtaccComponent, ImportClientComponent, ImportClientDataComponent, ImprtclntdtaComponent, AffilatenewuserComponent, EmailAllComponent],
  exports: [
    PhoneMaskDirective
  ],
  providers: [AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
