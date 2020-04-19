import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './header/clients/clients.component';
import { ActivitiesComponent } from './header/activities/activities.component';
import { ReportComponent } from './reports/report/report.component';
import { SettingsComponent } from './header/settings/settings.component';



import { ClientComponent } from './clients/client/client.component';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { TradeaccountsComponent } from './clients/tradeaccounts/tradeaccounts.component';
import { DashboardComponent } from './reports/dashboard/dashboard.component';
import { ExposureComponent } from './reports/exposure/exposure.component';
import { LeaderboardComponent } from './reports/leaderboard/leaderboard.component';

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
import { UserComponent } from './header/user/user.component';
import { CrmusersComponent } from './settings/crmusers/crmusers.component';
import { AffilateusersComponent } from './settings/affilateusers/affilateusers.component';
import { AdditionalfieldsComponent } from './settings/additionalfields/additionalfields.component';
import { ModulefieldsComponent } from './settings/modulefields/modulefields.component';
import { IplistComponent } from './settings/iplist/iplist.component';
import { TradinghoursComponent } from './settings/tradinghours/tradinghours.component';
import { WorkflowsComponent } from './settings/workflows/workflows.component';
import { ReportsComponent } from './header/reports/reports.component';
import { AccountsComponent } from './clients/accounts/accounts.component';
import { AllComponent } from './clients/all/all.component';
import { AuthGuard } from './auth.guard';
import { TermsComponent } from './terms/terms.component';
import { ClientsInfoComponent } from './clients-info/clients-info.component';
import { GeneralInfoComponent } from './clients_info/general-info/general-info.component';
import { ItemComponent } from './clients/item/item.component';
import { ImportClientComponent } from './clients/import-client/import-client.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},

{path: '', component: ClientsComponent},
 {path: 'clients', component: ClientsComponent,

    children: [
      {path: '', redirectTo: 'client', pathMatch: 'full'},
      {path: 'client', component: ClientComponent,
          // children:[
          //   {path:'',redirectTo:'',pathMatch:'full'},
          //   {path:'all',component:AllComponent},
          //   {path:'accounts',component:AccountsComponent}
          // ]
    },
      {path: 'client', component: ClientComponent},
      {path: 'tradeaccounts', component: TradeaccountsComponent}
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
{path: 'terms', component: TermsComponent},

// clients-info
{path: 'info', component: ClientsInfoComponent},
{path: 'generalinfo/:userid', component: GeneralInfoComponent},
{path: 'user', component: ItemComponent},

{path: 'importclients', component: ImportClientComponent}














];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
