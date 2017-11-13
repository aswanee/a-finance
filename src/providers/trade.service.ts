import { Injectable } from "@angular/core";
import { Headers } from "@angular/http";
import { session } from "../interfaces/session.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { ParentService } from "./parentservice.service";
import { Detailsresponse } from "../interfaces/details.interface";
import { portfolioresponse } from "../interfaces/portfolio.interface";
import {  userorderhistoryresponse,userorderresponse,userorder,OrderSide,OrderStatus,PriceType,TimeTerm} from "../interfaces/userorder.interface";
import { ValidationResponse,  CancelResponse,  PlaceResponse } from "../interfaces/Validate.interface";


@Injectable()
export class TradeService extends ParentService {

  
  GetPortfolioSummary(Session: session): Observable<Detailsresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/trading/GetPortfolioSummary?bimsid=";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = 0;
    let tokensymbol = "";
    let Uname = "";
    if (Session) {
      useraccounts = Session.result.UserAccounts.length;
      tokensymbol = Session.result.Token;
      Uname = Session.result.GeneralInfo.UserName;
    }
    if (useraccounts === 0 && Session) {
      this.link = this.link + Session.result.GeneralInfo.BIMSIAccountNumber;
    } else if (useraccounts !== 0 && Session) {
      this.link = this.link + Session.result.UserAccounts[0];
    }
    let body =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  GetPortfolio(Session: session, isArabic: boolean): Observable<portfolioresponse> {
    // htis.getlink();
    this.getsecurelink();
    this.link = this.link + "apis/trading/GetUserPortfolio?BimsUserID=";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = 0;
    let tokensymbol = "";
    let Uname = "";
    if (Session) {
      useraccounts = Session.result.UserAccounts.length;
      tokensymbol = Session.result.Token;
      Uname = Session.result.GeneralInfo.UserName;
    }
    if (useraccounts === 0 && Session) {
      this.link =
        this.link + Session.result.GeneralInfo.BIMSIAccountNumber + "&isArabic=" + isArabic;
    } else if (useraccounts !== 0 && Session) {
      this.link =
        this.link + Session.result.UserAccounts[0] + "&isArabic=" + isArabic;
    }

    let body =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <portfolioresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getorderhistory( Session: session, isArabic: boolean, orderid: number ): Observable<userorderhistoryresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/trading/GetUserOrderHistory?bimsUserID=";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = 0;
    let tokensymbol = "";
    let Uname = "";
    if (Session) {
      useraccounts = Session.result.UserAccounts.length;
      tokensymbol = Session.result.Token;
      Uname = Session.result.GeneralInfo.UserName;
    }
    if (useraccounts === 0 && Session) {
      this.link =
        this.link +
        Session.result.GeneralInfo.BIMSIAccountNumber +
        "&orderID=" +
        orderid +
        "&isArabic=" +
        isArabic;
    } else if (useraccounts !== 0 && Session) {
      this.link =
        this.link +
        Session.result.UserAccounts[0] +
        "&orderID=" +
        orderid +
        "&isArabic=" +
        isArabic;
    }

    let body =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <userorderhistoryresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getorders( Session: session, isArabic: boolean, view: number ): Observable<userorderresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/trading/GetUserOrders?BimsUserID=";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let useraccounts = 0;
    let Uname = "";
    let tokensymbol = "";
    if (Session) {
      useraccounts = Session.result.UserAccounts.length;
      Uname = Session.result.GeneralInfo.UserName;
      tokensymbol = Session.result.Token;
    }

    if (useraccounts === 0 && Session) {
      this.link =
        this.link +
        Session.result.GeneralInfo.BIMSIAccountNumber +
        "&view=" +
        view +
        "&isArabic=" +
        isArabic;
    } else if (useraccounts !== 0 && Session) {
      this.link =
        this.link +
        Session.result.UserAccounts[0] +
        "&view=" +
        view +
        "&isArabic=" +
        isArabic;
    }

    let body =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <userorderresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  PlaceOrder( isArabic: boolean, UpdateOrder: boolean, order: userorder, Session: session, Pin: number ): Observable<PlaceResponse> {
    
    this.getsecurelink();
    this.link =
      this.link +
      "apis/trading/PlaceOrder?isArabic=" +
      isArabic +
      "&updateOrder=" +
      UpdateOrder +
      "&pinCode=" +
      Pin;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let Uname = "";
    let tokensymbol = "";
    if (Session) {
      Uname = Session.result.GeneralInfo.UserName;
      tokensymbol = Session.result.Token;
    }
    let value =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    let body =
      "Order={PriceType:'" +
      PriceType[order.PriceType] +
      "'," +
      "TimeTerm:'" +
      TimeTerm[order.TimeTerm] +
      "'," +
      "BimsUserID:" +
      order.BimsUserID +
      ",ReutersCode:'" +
      order.ReutersCode +
      "',Side:'" +
      OrderSide[order.Side] +
      "',Price:" +
      order.Price +
      ",Quantity:" +
      order.Quantity +
      ",Username:'" +
      order.Username +
      "',ID:" +
      order.ID +
      ",BimsID:" +
      order.BimsID +
      ",Status:'" +
      OrderStatus[order.Status] +
      "',ExecutedQuantity:" +
      order.ExecutedQuantity +
      "}&" +
      value;
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <PlaceResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  ValidateOrder( isArabic: boolean,UpdateOrder: boolean,order: userorder,Session: session): Observable<ValidationResponse> {
    this.getsecurelink();
    this.link =
      this.link +
      "apis/trading/ValidatePlaceOrder?isArabic=" +
      isArabic +
      "&updateOrder=" +
      UpdateOrder;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let Uname = "";
    let tokensymbol = "";
    if (Session) {
      Uname = Session.result.GeneralInfo.UserName;
      tokensymbol = Session.result.Token;
    }
    let value =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    let body =
      "Order={PriceType:'" +
      PriceType[order.PriceType] +
      "'," +
      "TimeTerm:'" +
      TimeTerm[order.TimeTerm] +
      "'," +
      "BimsUserID:" +
      order.BimsUserID +
      ",ReutersCode:'" +
      order.ReutersCode +
      "',Side:'" +
      OrderSide[order.Side] +
      "',Price:" +
      order.Price +
      ",Quantity:" +
      order.Quantity +
      ",Username:'" +
      order.Username +
      "',ID:" +
      order.ID +
      ",BimsID:" +
      order.BimsID +
      ",Status:'" +
      OrderStatus[order.Status] +
      "',ExecutedQuantity:" +
      order.ExecutedQuantity +
      "}&" +
      value;
    return this.http
      .post(this.link, body, { headers: headers })
      .map(x => {
        return <ValidationResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  CancelOrder(orderid: number,isArabic: boolean,pin: number,Session: session): Observable<CancelResponse> {
    
    this.getsecurelink();
    this.link =
      this.link +
      "apis/trading/CancelOrder?orderID=" +
      orderid +
      "&isArabic=" +
      isArabic +
      "&pinCode=" +
      pin;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let Uname = "";
    let tokensymbol = "";
    if (Session) {
      Uname = Session.result.GeneralInfo.UserName;
      tokensymbol = Session.result.Token;
    }
    let value =
      "username=" + Uname + "&token=" + encodeURIComponent(tokensymbol);
    return this.http
      .post(this.link, value, { headers: headers })
      .map(x => {
        return <CancelResponse>x.json();
      })
      .catch((t: Response) => t.json());
    // 312true12312';
  }
}
