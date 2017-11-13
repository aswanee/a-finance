export interface portfolioresponse {
  Status: string;
  result: portfolio[];
}
interface portfolio {
  ReutersCode: string;
  ENG_NAME: string;
  ARB_Name: string;
  Symbol_Code: string;
  TotalQuantity: number;
  AveragePrice: number;
  PurchasePrice: number;
  BIMSIAccountNumber: number;
  AvailableQuantity: number;
  CurrencyID: number;
  LastTrade: number;
  NetChange: number;
  PercentageChange: number;
  CUSTODIANID: number;
  CUSTODIAN_ARAB: string;
  CUSTODIAN_ENG: string;
  MarketValue: number;
  GainLossPercentage: number;
}
