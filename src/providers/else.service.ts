import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import { ParentService } from "./parentservice.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
//import { OnInit } from "@angular/core";
import { Detailsresponse } from "../interfaces/details.interface";
import { MarketDetails } from "../interfaces/marketsummary.interface";
@Injectable()
export class GetService extends ParentService {

  getmarketsummary(): Observable<any> {
    this.getunsecurelink();
    return this.http
      .get(this.link + "apis/market/GetMarketSummary?Schema=false")
      .map(x => {
        return <MarketDetails>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getquotetrades(code: string, id: number): Observable<any> {
    this.getunsecurelink();
    this.link =
      this.link + "apis/market/QuoteTrades?Code=" + code + "&lID=" + id;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getmarketdetails(cid: number = 1): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetMarketInformation?CID=" + cid;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
