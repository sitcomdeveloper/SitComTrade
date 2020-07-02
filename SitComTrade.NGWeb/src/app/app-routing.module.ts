import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent, TradeaccountsComponent} from './clients';
import {MonetarytransactionsComponent, TasksComponent, CasesComponent, DocumentsComponent, OpenedordersComponent, ClosedordersComponent, PendingordersComponent, RejectedtransactionComponent, CommonjournalComponent  } from './activities';
// tslint:disable-next-line: max-line-length
import {BenchmarkComponent, DashboardComponent, ExposureComponent, LeaderboardComponent, ReportComponent, TradingjournalsComponent} from './reports';
// tslint:disable-next-line: max-line-length
import {EmailtemplatesComponent, SendersettingsComponent, GroupsComponent, InstrumentsComponent,
  TranslationsComponent, FiltersComponent, ImportsComponent, CrmusersComponent, AffilateusersComponent, AdditionalfieldsComponent,
  ModulefieldsComponent, IplistComponent, TradinghoursComponent, WorkflowsComponent, GroupsInfoComponent } from './settings';
import { ClientsComponent } from './header/clients/clients.component';
import { ActivitiesComponent } from './header/activities/activities.component';
import { SettingsComponent } from './header/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { ReportsComponent } from './header/reports/reports.component';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { LiveDetailComponent } from './clients/tradeaccounts/live-detail/live-detail.component';
import { AuthGuard } from './auth.guard';
// import { CreateInstrumentsComponent } from './settings/instruments/create-instruments/create-instruments.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

{path: '', component: ClientsComponent, canActivate: [AuthGuard]},
 {path: 'clients', component: ClientsComponent, canActivate: [AuthGuard],

    children: [
      {path: '', redirectTo: 'client', pathMatch: 'full'},
      {path: 'client', component: ClientComponent},
      // {path: 'client', component: ClientComponent},
      {path: 'tradeaccounts', component: TradeaccountsComponent, }
    ]},
  {path: '', component: ActivitiesComponent},
  {path: 'activities', component: ActivitiesComponent,
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'monetarytransactions', component: MonetarytransactionsComponent},
      {path: 'tasks', component: TasksComponent},
      {path: 'cases', component: CasesComponent},
      {path: 'documents', component: DocumentsComponent},
      {path: 'openedorders', component: OpenedordersComponent},
      {path: 'closedorders', component: ClosedordersComponent},
      {path: 'pendingorders', component: PendingordersComponent},
      {path: 'rejectedtransactions', component: RejectedtransactionComponent},
      {path: 'commonjournal', component: CommonjournalComponent}

    ]},

{path: '', component: ReportsComponent},
{path: 'reports', component: ReportsComponent,
    children: [
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'exposure', component: ExposureComponent},
      {path: 'leaderboard', component: LeaderboardComponent},
      {path: 'report', component: ReportComponent},
      {path: 'tradingjournals', component: TradingjournalsComponent},
      {path: 'benchmark', component: BenchmarkComponent}
    ]
},

{path: '', component: SettingsComponent},
{path: 'settings', component: SettingsComponent,
  children: [
    {path: '', redirectTo: '', pathMatch: 'full'},
           {path: 'crmusers', component: CrmusersComponent},
           {path: 'affilateusers', component: AffilateusersComponent},
    {path: 'emailtemplates', component: EmailtemplatesComponent},
    {path: 'sendersettings', component: SendersettingsComponent},
    {path: 'groups', component: GroupsComponent},
    {path: 'instruments', component: InstrumentsComponent},
          {path: 'additionalfields', component: AdditionalfieldsComponent},
          {path: 'modulefields', component: ModulefieldsComponent},
          {path: 'iplist', component: IplistComponent},
          {path: 'tradinghours', component: TradinghoursComponent},
          {path: 'workflows', component: WorkflowsComponent},
    {path: 'translations', component: TranslationsComponent},
    {path: 'filters', component: FiltersComponent},
     {path: 'imports', component: ImportsComponent}
  ]
},
// terms and conditions
// {path: 'terms', component: TermsComponent},
// clients-info
{path: 'info/:selectedItem', component: ClientsInfoComponent},
// for group(general-info)
{path: 'groups-info/:setItem/:publicid', component: GroupsInfoComponent},
// tradeaccount
{path: 'livetrade/:trdingDtls', component: LiveDetailComponent},
// /:trdingDtls
// ,canActivate:[AuthGuard]
{path: 'groups-info/:instrumentsId/:instid', component: GroupsInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
  })
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
