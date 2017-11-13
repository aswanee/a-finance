//import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Response } from "@angular/http";
import { SerResponse } from "../interfaces/response.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class AskBidService extends ParentService {
  getasks(reuter: string): Observable<any>  {
    this.getunsecurelink();
    this.link = this.link + "apis/market/QuoteAsks?Code=" + reuter;
    return this.http
      .get(this.link)
      .map(x => {
        var temp= <SerResponse>x.json();
        if(temp.result)
        {
          var acc :number;
          var i:number=0;
          for(i=0;i<temp.result.length;i++)
          {
            if(i==0)
            {
              acc = Number(temp.result[i][2])
              temp.result[i].push(acc.toString());
            }
            else{
              acc =acc+  +temp.result[i][2];
              temp.result[i].push(acc.toString());
            }
          }
          return temp;
        }
      })
      .catch((t: Response) => t.json());
  }

  getbids(reuter: string): Observable<any> {
    this.getunsecurelink();
    this.link = this.link + "apis/market/QuoteBids?Code=" + reuter;
    return this.http
      .get(this.link)
      .map(x => {
        var temp= <SerResponse>x.json();
        if(temp.result)
        {
          var acc :number;
          var i:number=0;
          for(i=0;i<temp.result.length;i++)
          {
            if(i==0)
            {
              acc = Number(temp.result[i][2])
              temp.result[i].push(acc.toString());
            }
            else{
              acc =acc+  +temp.result[i][2];
              temp.result[i].push(acc.toString());
            }
          }
          return temp;
        }
      })
      .catch((t: Response) => t.json());
  }
}
