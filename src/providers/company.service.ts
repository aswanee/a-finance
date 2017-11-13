import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import { Newsresponse } from "../interfaces/newsresponse.interface";
import { Newsdetailsresponse } from "../interfaces/newsdetailsresponse.interface";
import { ParentService } from "./parentservice.service";
@Injectable()
export class CompanyService extends ParentService {

  getnews(
    strDate: string,
    count: number,
    nLang:number
  ): Observable<any> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/market/GetNews?lastPostingTime=" +
      strDate +
      "&count=" +
      count +
      "&nlang=" + 
      nLang;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  getnewsRange(
    //from: Date,
    tempto: string,
    count: number,
    nLang:number
  ): Observable<any> {
    this.getunsecurelink();
    //let tempfrom = from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate();
    this.link =
      this.link +
      "apis/market/GetNewsWithRange?to=" +
      tempto +
      //"%2011:10&from=" +
      //tempfrom +
      "&count=" +
      count +
      "&nlang=" +
      nLang;
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  
  getnewsdetails(id: number,UserID :number): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetNewsDetails?newsId=" + id + "&userid=" + UserID.toString();
    return this.http
      .get(this.link)
      .map(x => {
        return <Newsdetailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getnewsrelated(id: string,isArabic:boolean): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetNewsRelatedTo?Code=" + id + "&isArabic=" + isArabic;

    return this.http
      .get(this.link)
      .map(x => {
        return <Newsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
