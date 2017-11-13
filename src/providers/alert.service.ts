//import { OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Headers } from "@angular/http";
import { alertresponse, Type, Criteria, Field } from "../interfaces/alert.interface";
import { deleteresponse } from "../interfaces/delete.interface";
import { add } from "../interfaces/addresponse.interface";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { ParentService } from "./parentservice.service";
@Injectable()
export class AlertService extends ParentService {

  getUseralerts(id: number, update: Date): Observable<alertresponse> 
  {
    this.getsecurelink();
    this.link = this.link + "apis/account/GetUserAlerts?UserID=";
    let stringdate = "";
    stringdate = update.getFullYear() + "-" + (update.getMonth() + 1) + "-" + update.getDate();
    this.link = this.link + id + "&LastUpdated=" + stringdate;    
    
    return this.http
    .get(this.link)
    .map(res => {
        var newData = <alertresponse>res.json();
        newData.result[0].forEach(element => {
            element.MetTime = this.JsonToDateString(element.MetTime)
            element.SetTime = this.JsonToDateString(element.SetTime)
        });
        return newData;

    })
    .catch((t: Response) => t.json());
  }

  JsonToDateString (param:string):string{
    if(param && param.length >10)
    {
      var toDate :Date = new Date(parseInt(param.substr(6)));
      var toStr:string = toDate.toLocaleDateString("en-US");
      //return toStr.replace("/","-")
      var newstr = toStr.split('/').reverse().join('-')
      return newstr;//toStr.replace(/\//g, "-");
      
    }
    else
    {
      return "";
    }
  }

  deletealerts(id: number): Observable<deleteresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/account/DeleteAlert?alertIDs=";
    this.link = this.link + id;
    return this.http
      .get(this.link)
      .map(x => {
        return <deleteresponse>x.json();
      })
      .catch((t: Response) => t.json());

  }

  updatealerts(
    id: number,
    code: string,
    AlertID: number,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<deleteresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/account/UpdateAlert";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string ="Alert={ UserID:" + id + "," + "Code:" + "'" + code + "'" + ",AlertID:" +
      AlertID + ", Type:" + Type + ",Field:" + Field + ",Criteria: " + Criteria +
      ",Value:" + Value + ",Note:" + "'" + Note + "'}";
      
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <deleteresponse>x.json();
      })
      .catch((t: Response) => t.json());
  }
  addalert(
    UserID: number,
    Code: string,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<add> {
    this.getsecurelink();
    this.link = this.link + "apis/account/AddAlert";
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string =
      "Alert={ UserID:" +
      UserID +
      "," +
      "Code:" +
      "'" +
      Code +
      "'" +
      ", Type: " +
      Type +
      ",Field: " +
      Field +
      ",Criteria: " +
      Criteria +
      ",Value:" +
      Value +
      ",Note:" +
      "'" +
      Note +
      "'}";
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <add>x.json();
      })
      //.catch((t: Response) => t.json());
  }

  updatealertswithticker(
    id: number,
    code: string,
    AlertID: number,
    Type: Type,
    Field: Field,
    Criteria: Criteria,
    Value: number,
    Note: string
  ): Observable<deleteresponse> {
    this.getsecurelink();
    this.link = this.link + "apis/account/UpdateAlertViewedByTicker?UserID=";
    this.link = this.link + id + "&Code=" + code;
    let headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    let sent: string =
      "Alert={ UserID:" +
      id +
      "," +
      "Code:" +
      "'" +
      code +
      "'" +
      ",AlertID:" +
      AlertID +
      ", Type:" +
      Type +
      ",Field:" +
      Field +
      ",Criteria: " +
      Criteria +
      ",Value:" +
      Value +
      ",Note:" +
      "'" +
      Note +
      "'}";
    return this.http
      .post(this.link, sent, { headers: headers })
      .map(x => {
        return <deleteresponse>x.json();
      })
      //.catch((t: Response) => t.json());
  }
}
