import { Component } from "@angular/core";
import { IonicPage } from "ionic-angular";
import { StockService } from "./../../providers/stock.service";
import { Platform } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
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

  constructor(
     private StockService: StockService,
     private platform: Platform
  ) {}
  ngOnInit() {
  }
  ionViewDidLoad() {
  }

  toarab() {

    window["language"] = "ar";
    localStorage.setItem('language', 'ar');

    window["isArabic"] = true;
    localStorage.setItem('isArabic', "true");
    this.StockService.getnames(true).subscribe();
    this.platform.setDir('rtl', true)
    
  }

  toen() {
    window["language"] = "en";
    localStorage.setItem('language', 'en');

    window["isArabic"] = false;
    localStorage.setItem('isArabic', "false");
    this.StockService.getnames(false).subscribe();
    this.platform.setDir('ltr', true)
    
  }
}
