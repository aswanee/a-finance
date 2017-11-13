export interface ValidationResponse {
  Status: string;
  result: Validation;
}
export interface PlaceResponse {
  Status: string;
  result: Place;
}
export interface Place {
  Status: PlaceOrderStatus;
  OutMessages: string;
  ID: number;
  BimsID: number;
}
interface Validation {
  Result: OrderOperationResult;
  Message: string;
}
export enum OrderOperationResult {
  Success,
  Failed,
  InvalidAccountNo,
  InvalidSymbolCode,
  InvalidQuantity,
  InvalidMinQty,
  InvalidMarket,
  OrderExpired,
  NoSufficientCash,
  NoSufficientStocks,
  TooLate,
  InvalideOldID,
  ExeQtyGreaterQty,
  InvalidCurrency,
  MarketClosed,
  InactiveTicker,
  OTCMarketClosed,
  InvalidMarketCode,
  NotAllowedTicker,
  InvalidPrice
}

export interface CancelResponse {
  Status: string;
  result: Cancel;
}
export interface Cancel {
  Status: CancelOrderStatus;
  Result: number;
  OutMessages: string;
}
export enum CancelOrderStatus {
  Completed = 1,
  InvalideUserPIN = 2,
  InvalideOrderID = 3,
  WebServiceError = 4
}
export enum PlaceOrderStatus {
  Completed = 1,
  InvalideUserPIN = 2,
  SystemError = 3,
  WebServiceError = 4,
  OffLineError = 5,
  MarketClosed = 6
}
