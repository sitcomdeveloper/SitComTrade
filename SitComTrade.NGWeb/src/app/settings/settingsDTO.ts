// import {settingsDTO} 
export interface Instruments {
    Id: number;
Name: String;
DisplayName: String;
GroupId: number;
GroupName: String;
SpreadType: String;
SpreadBid: number;
IsTradeForbidden: boolean;
ContractSize: number;
LeverageId: number;
LeverageName: String;
ProfitCurrency: String;
SymbolGroup: String;
GapLevel: number;
TradingHoursId: String;
Units: number
}