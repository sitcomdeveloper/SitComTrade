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
  UserId:'',
  Id: '';
  Name: String;
DisplayName: String;
GroupId: '';
GroupName: String
SpreadTypeName: String;
SpreadBid: number;
IsTradeForbidden: boolean;
ContractSize: number;
LeverageId: ''
LeverageName: String;
ProfitCurrencyName: String;
SymbolGroupName: String;
GapLevel: number;
TradingHoursId: '';
UnitName: number;

MarginCurrencyName: String;
Description: String;
SpreadAsk: number;
MaximalVolume: number;
VolumeStep: number;
MinimalVolume: number;
MarginHedge: number;
SwapLong: number;
SwapShort: number;
StopLevel: number;
Digits: number;
CalculationModeName: String;
Commission: number;
SwapTypeName: String;
ThreeDaysSwapName: String;
CommissionCurrencyName: String;
Hidden: boolean;
ExpirationDate: '';
IsDisabled: boolean

SpreadTypeId: '',
ProfitCurrencyId: '',
    SymbolGroupId: '',
    TradingHoursName: String,
    UnitId: '',
    MarginCurrencyId: '',
    CalculationModeId: '',
    SwapTypeId: '',
    ThreeDaysSwapId: '',
    CommissionCurrencyId: '',
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

export interface EmailTemplatesDTO {
  Id: '',
  Name: String;
Subject: String;
IsSysTemplate: boolean;
IsPublic: boolean;
Template: '';
UserId: ''
}

export interface IpDTO {
  Id: '',
        IPAddress: number,
        Description: String,
        UserId: ''
}