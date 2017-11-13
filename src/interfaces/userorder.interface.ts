export interface userorderhistoryresponse {
  Status: string;
  result: userorderhistory;
}
export interface userorderresponse {
  Status: string;
  result: userorder[];
}
export interface userorderhistory {
  BkeeperID: number;
  OrderReference: string;
  PriceType: PriceType;
  TimeTerm: TimeTerm;
  BimsUserID: number;
  ReutersCode: string;
  Side: OrderSide;
  Price: number;
  Quantity: number;
  Username: string;
  ID: number;
  BimsID: number;
  OrderDate: string;
  SymbolCode: string;
  CurrencyCode: string;
  ExpireAt: string;
  Status: OrderStatus;
  ExecutedQuantity: number;
  details: details[];
}
export interface userorder extends userorderhistory {
  strOrderDate: Date;
  strExpireAt: Date;
}
export interface details {
  PlaceType: PlaceType;
  SentTime: string;
  Price: number;
  Quantity: number;
  PriceType: number;
  strSentTime: Date;
}

export enum PriceType {
  Market = 1,
  Limit = 2
}

export enum TimeTerm {
  Day = 2,
  Week = 4,
  Month = 5
}

export enum OrderSide {
  Buy = 1,
  Sell = 2,
  Sell_T0 = 3,
  Sell_T1 = 4
}

export enum OrderStatus {
  Open = 1,
  Completed = 2,
  Expired = 3,
  Canceled = 4,
  PartiallyExecuted = 5,
  PendingApproval = 6,
  Rejected = 7,
  Suspended = 8,
  InvalidOrder = 9
}
export function checkupdatability(userorder: userorder): boolean {
  if (
    userorder.Status === 1 ||
    userorder.Status === 5 ||
    userorder.Status === 6 ||
    userorder.Status === 8
  ) {
    return true;
  } else {
    return false;
  }
}
export enum PlaceType {
  Place = 22,
  Update = 25,
  Cancel = 26
}
