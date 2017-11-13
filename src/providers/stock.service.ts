//import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { Stock } from "../interfaces/stock.interface";
import { SerResponse } from "../interfaces/response.interface";
import { Detailsupdateresponse } from "../interfaces/detailsupdateresponse.interface";
import { Detailsresponse } from "../interfaces/details.interface";
import { Chartobjectresponse } from "../interfaces/chartobjresponse.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class StockService extends ParentService {
  stocks: Stock;
  objs: Stock[] = new Array();
  substrings: string[] = new Array();
  names: string[] = new Array();
  List: SerResponse;

  getstock(nameobj: string[], isArabic: boolean): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetSimpleQuotesDetails?Codes=";

    for (let i = 0; i < nameobj.length - 1; i++) {
      this.link = this.link + nameobj[i] + ",";
    }
    this.link =
      this.link + nameobj[nameobj.length - 1] + "&isArabic=" + isArabic;
    return this.http
      .get(this.link)
      .map(x => {
        var StockDetails :SerResponse = <SerResponse>x.json();
        return StockDetails;
      })
      .catch((t: Response) => t.json());
  }

  getstockv2(nameobj: string[], OldStockDetails:SerResponse, isArabic: boolean): Observable<any>   {

    if(!nameobj || nameobj.length==0)
    {
      nameobj = [this.List.result[0][0], this.List.result[1][0]];
    }
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetSimpleQuotesDetails?Codes=";

    for (let i = 0; i < nameobj.length - 1; i++) {
      this.link = this.link + nameobj[i] + ",";
    }
    this.link =
      this.link + nameobj[nameobj.length - 1] + "&isArabic=" + isArabic;
    return this.http
      .get(this.link)
      .map(x => {
        //========================================================================
        var data :SerResponse = <SerResponse>x.json();
        
        for (let i = 0; i < data.result.length; i++) 
        {
          data.result[i].push(nameobj[i]);
          var isNew:boolean = true;
          loop1:
          if(OldStockDetails!=undefined)
          {
            for (let ii = 0; ii < OldStockDetails.result.length; ii++)
            {
              if(nameobj[i] == OldStockDetails.result[ii][4])
              {
                isNew = false;
                //var OldValue:string = OldStockDetails.result[ii][0];

                if(this.List.status!=OldStockDetails.result[ii][7])
                {
                  loop2:
                  for (let j = 0; j < this.List.result.length; j++) {
                    if (this.List.result[j][0] === nameobj[i]) {
                      data.result[i].push(this.List.result[j][1]);
                      break loop2;
                    }
                  }
                }
                else
                {
                  data.result[i].push(OldStockDetails.result[ii][5]);
                }
                data.result[i].push(OldStockDetails.result[ii][0]);
                data.result[i].push(this.List.status);
                break loop1;
              }
            }
          }
          if(isNew)
          {
            loop2:
            for (let j = 0; j < this.List.result.length; j++) {
              if (this.List.result[j][0] === nameobj[i]) {
                data.result[i].push(this.List.result[j][1]);
                break loop2;
              }
            }
            let lang = isArabic? "ar":"en";
            data.result[i].push(data.result[i][0]);// Add Old Value 
            data.result[i].push(lang);// Add Old Value 
            isNew =false;
          }
        }
        //=========================================================================
        return data;
      })
      .catch((t: Response) => t.json());
  }

  getstockwithupdate(nameobj: string, date: Date): Observable<any> {
    this.getunsecurelink();
    let temp = "";
    temp = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    this.link =
      this.link +
      "apis/market/GetSimpleQuotesDetailsWithLastUpdated?Codes=" +
      nameobj +
      "&lastUpdated=" +
      temp;
    return this.http
      .get(this.link)
      .map(x => {
        return <SerResponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getstockdetails(nameobj: string,isArabic: boolean): Observable<any> {
    this.getunsecurelink();
    this.link =
      this.link +
      "apis/market/GetQuoteDetails?Code=" +
      nameobj +
      "&isArabic=" +
      isArabic;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getstockdetailswithupdate(nameobj: string, isArabic: boolean, date: Date ): Observable<any> {
    this.getunsecurelink();
    let temp = "";
    temp =
      date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
    this.link =
      this.link +
      "apis/market/GetQuotesDetails?Codes=" +
      nameobj +
      "&isArabic=" +
      isArabic +
      "&lastUpdated=" +
      temp;
    return this.http
      .get(this.link)
      .map(x => {
        return <Detailsupdateresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

  getnames(isArabic: boolean): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetQuotesList?isArabic=" + isArabic;
    return (
      this.http
        .get(this.link)
        // .get('./../assets/cmps.json')
        .map(x => {
          //this.List = x.json();
          var TempList: SerResponse =  x.json();
          this.List =  {
            status:"",
            result:[]
           };
          this.List.result = TempList.result;
          this.List.status = isArabic? "ar":"en";
          return this.List;
        })
        .catch((t: Response) => t.json())
    );
  }

  getchart( codes: string, from: Date, to: Date, isIntra: number ): Observable<any> {
    this.getunsecurelink();
    let temp1 = "";
    temp1 = from.getFullYear() + "-" + from.getMonth() + "-" + from.getDate();
    let temp2 = "";
    temp2 = to.getFullYear() + "-" + to.getMonth() + "-" + to.getDate();
    this.link =
      this.link +
      "apis/market/GetSimpleChartWithinRange?Codes=" +
      codes +
      "&from=" +
      temp1 +
      "&to=" +
      temp2 +
      "&isIntra=" +
      isIntra;
    return this.http
      .get(this.link)
      .map(x => {
        return <Chartobjectresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }

}
