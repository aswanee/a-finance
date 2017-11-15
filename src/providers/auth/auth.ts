import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { ParentService } from "../../providers/parentservice.service";
import { Observable } from "rxjs/Observable";
import { session ,User} from "../../interfaces/session.interface";
import { Storage } from "@ionic/storage";
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs';

export interface LocalAuth { save:boolean, username:string, password:string } ;

@Injectable()
export class AuthProvider extends ParentService {

  CurrentSession: session;
  
  constructor(public http: Http, private storage: Storage) {
    super(http)
    console.log('Hello AuthProvider Provider');
  }

  public login(credentials :User,saveme: boolean){
    // if (credentials.username === null || credentials.password === null) {
    //   return Observable.throw("Please insert credentials");
    // } else {
        // At this point make a request to your backend to make a real check!

        this.getsecurelink();
        this.link = this.link + "apis/account/token";
        let headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        let body = "auth={UserName:'" + credentials.username + "',Password:'" + credentials.password + "'}";

        //let response = 
        this.http.post(this.link, body, {
          headers: headers
        })
        .map(x => {
          let Session = <session>(x.json());
          this.StorageAuth ={save: false , username: "" , password: "" };
          this.StorageAuth.save = saveme;
          if(!Session ||!Session.result || Session.result.GeneralInfo.UserID<=0)
          {
            console.log(Session);
            this.CurrentSession =   { Status : "", result: null };
            this.StorageAuth.username = "";
            this.StorageAuth.password = "";

            this.storage.set("LocalAuth", this.StorageAuth);
            //observer.next(false);
          }
          else
          {
            this.CurrentSession = Session;
            this.StorageAuth.username = credentials.username;
            this.StorageAuth.password = credentials.password;
            
            this.storage.set("LocalAuth", this.StorageAuth);
            this.storage.set("session", this.CurrentSession);
            this.storage.set("GeneralInfo", this.CurrentSession.result.GeneralInfo);
            this.storage.set("Custodians", this.CurrentSession.result.UserCustodians);
            this.storage.set("Accounts", this.CurrentSession.result.UserAccounts);
            this.storage.set("SelectedBIMS", this.CurrentSession.result.GeneralInfo.BIMSIAccountNumber);
            //observer.next(true)
          }
          this.subject.next({ CurrentSession: this.CurrentSession });
        })
         .subscribe(
          data =>{
            console.log(data)
          },

          ()=>{
            console.log("COMPLET :)")
          }
         )
    //}
  }

  public getUserInfo() : session {
    return this.CurrentSession;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.CurrentSession = null;
      observer.next(true);
      this.subject.next({ CurrentSession: this.CurrentSession });
      observer.complete();
    });
  }
  StorageAuth:LocalAuth ={save: false , username: "" , password: "" };


  public getStorageAuth() :any  {
    return this.storage.get("LocalAuth").then(localAuth => {
      this.StorageAuth = <LocalAuth>localAuth ;
      // if(LocalAuth )
      // {
      //   this.StorageAuth.save = true;
      //   this.StorageAuth.username = LocalAuth[0];
      //   this.StorageAuth.password = true[1];
      // }
      return this.StorageAuth;
    })      
    .catch((t: Response) => t.json());
    
  }

  private subject = new Subject<any>();
  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }



}
