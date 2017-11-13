import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { session } from "./../../interfaces/session.interface";
import { Storage } from "@ionic/storage";
@IonicPage()
@Component({
  selector: "page-switch-accounts",
  templateUrl:"switch-accounts.html" 
})
export class SwitchAccountsPage {

  
   GetCustNavID(event) {
     switch(event)
     {
       case "notifications":
         console.log(event);
         break;
       case "add":
         console.log(event);
         break;
       case "checkmark":
         console.log(event);
         break;
     }
   }
 
   buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}> = 
   [
     // {BName: "notifications", IconName: "notifications"},
     // {BName: "add", IconName: "add"},
     // {BName: "checkmark", IconName: "checkmark"}
   ];
 
   
  Session: session;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private Storage: Storage
  ) {
    this.Session = this.navParams.get("Session");
  }
  SwitchAccountsPage(index: number) {
    for (let i = 0; i < this.Session.result.UserAccounts.length; i++) {
      if (index === i) {
        let temp = this.Session.result.UserAccounts[0];
        this.Session.result.UserAccounts[0] = this.Session.result.UserAccounts[i];
        this.Session.result.UserAccounts[i] = temp;
        this.Storage.set("session", this.Session);

        this.Storage.set("SelectedBIMS", this.Session.result.UserAccounts[0]);
        this.Storage.set("Accounts", this.Session.result.UserAccounts);
        
        break;
      }
    }
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad SwitchAccountsPage");
  }
}
