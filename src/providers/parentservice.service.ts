import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
@Injectable()
export class ParentService {
  constructor(protected http: Http) {}
  
  link: string;
  securedebug: boolean = false;
  unsecuredebug: boolean =false;
  getsecurelink() {
    if (this.securedebug === true) {
      this.link = "http://staging5.arabfinance.com/";
    } else {
      this.link = "https://www.arabfinance.com/";
    }
  }
  //apis/market/
  getunsecurelink() {
    if (this.unsecuredebug === true) {
      this.link = "http://staging5.arabfinance.com/";
    } else {
      this.link = "https://www.arabfinance.com/";
    }
  }
}
