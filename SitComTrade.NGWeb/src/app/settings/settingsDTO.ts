export interface Workflows {
  Id: '';
    Name: String;
          Event: String;
          UserId: number;
          UserName: String;
          ModuleId: number;
          ModuleName: String;                          
          IsEnabled: boolean  
}

export interface InstrumentsDTO {
  Id: '';
  Name: String;
DisplayName: String;
GroupId: number;
GroupName: String
SpreadType: String;
SpreadBid: number;
IsTradeForbidden: boolean;
ContractSize: number;
LeverageId: number
LeverageName: String;
ProfitCurrency: String;
SymbolGroup: String;
GapLevel: number;
TradingHoursId: String;
Units: number;
// MarginCurrency: String;
}

export interface SenderEmailDTO {
  Id: '',
  Name: String;
  Description: String;
  SenderMailId: String;
  IsShared: '';
  ProviderId: '';
  ProviderName: String;                          
   ServerAddress: String;
   PortNo: '';
   FromAddress: String;
   MailPassword: String
}