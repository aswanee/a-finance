import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { LanguagePipe } from "./../../pipes/Language/Language.pipe";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  dorefresh = false;
  constructor() {}

  // ngOnInit() {
  //   //var buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}>;
  //   //buttons = [
  //   //  {BName: "notifications", IconName: "notifications"},
  //   //  {BName: "add", IconName: "add"},
  //   //  {BName: "checkmark", IconName: "checkmark"}
  //   //];
  //   //this.cld.buttons = buttons;
  // }

  get isArabic():boolean
  {
    if(window["isArabic"]!=undefined)
      return window["isArabic"];
    else
      return true;
      
  }

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
}
