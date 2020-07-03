// export interface InstrumentsDTO {
//   length: any;
// //   DTO
// Id: number;
// Name: String;
// DisplayName: String;
// GroupId: number;
// GroupName: String;
// SpreadType: String;
// SpreadBid: number;
// IsTradeForbidden: boolean;
// ContractSize: number;
// LeverageId: number;
// LeverageName: String;
// ProfitCurrency: String;
// SymbolGroup: String;
// GapLevel: number;
// TradingHoursId: String;
// Units: number;
// // MarginCurrency: String;
// }

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
  
  length: number;
  // length: any;
  // DTO
  Id: number;
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