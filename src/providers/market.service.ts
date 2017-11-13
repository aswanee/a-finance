import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { SerResponse } from "../interfaces/response.interface";
import { MarketResponse } from "../interfaces/Marketresponse.interface";
import { ParentService } from "./parentservice.service";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MarketService extends ParentService {

  MarketStatus :{Status:string, Time:string, Datetime : Date} = {Status:"CLOSE", Time:"00000",Datetime: new Date()};
  
  private subject = new Subject<any>();
  
  getperformers(id: string, isArabaic: boolean): Observable<any> {
    this.getunsecurelink();
    let link = this.link + "apis/market/GetPerformers?TPID=";
    link = link + id + "&isArabic=" + isArabaic;
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getindices(id: string): Observable<any> {
    this.getunsecurelink();
    let link = this.link + "apis/market/GetIndices?IID=";
    link = link + id;
    return this.http
      .get(link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getperformerstable(): Observable<any> {
    this.getunsecurelink();
    return this.http
      .get(this.link + "apis/market/GetPerformersTable")
      .map(x => {
        return <MarketResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  
  getindicestable(): Observable<any> {
    this.getunsecurelink();
    return this.http
      .get(this.link + "apis/market/GetIndicesTable")
      .map(x => {
        return <MarketResponse>x.json();
      })
     .catch((t: Response) => t.json());
  }
  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  getmarketstatus(): Observable<any> {

    this.subject.next({ FavoriteNews: this.MarketStatus });
    
    this.getunsecurelink();
    return this.http 
      .get(this.link + "apis/market/GetMarketStatus")
      .map(x => {
        var data = <any>x.json();
        if(data && data.result){
          this.MarketStatus.Status = data.result.MarketStatuse;
          this.MarketStatus.Datetime = this.JsonToDate(data.result.RegTime);
          this.MarketStatus.Time =  this.MarketStatus.Datetime.toLocaleTimeString();  
        }
        this.subject.next({ FavoriteNews: this.MarketStatus });
        
        return this.MarketStatus;
      })
      .catch(error => Observable.throw(error));
  }

  JsonToDate (param):Date{
    return new Date(parseInt(param.substr(6)));
  }
}
