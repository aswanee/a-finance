import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { userorderhistoryresponse, userorderresponse, userorder} from "./../../interfaces/userorder.interface";
import { ValidationResponse, CancelResponse } from "./../../interfaces/Validate.interface";
import { Detailsresponse } from "./../../interfaces/details.interface";
import { portfolioresponse } from "./../../interfaces/portfolio.interface";
import { session } from "./../../interfaces/session.interface";
import { StockService } from "./../../providers/stock.service";
import { Platform } from "ionic-angular";
//import { CustNavComponent} from '../../components/cust-nav/cust-nav'


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit{
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

  pepperoni;
  sausage;
  mushrooms;
  userorderhistoryresponse: userorderhistoryresponse;
  userorderresponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: Detailsresponse;
  //lang: string;
  openlanguage: boolean = false;
  showabout = false;
  ValidationResponse: ValidationResponse;
  userSession: session;
  userorder: userorder = {
    PriceType: 2 /*Market -  Limited*/,
    TimeTerm: 2 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 1 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0,
    Quantity: 1,
    Username: "",
    CurrencyCode: "",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: "/Date(1503913325113)/",
    SymbolCode: "",
    ExpireAt: "/Date(1503871200000)/",
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: new Date("2017-08-28T11:42:05.05"),
    strExpireAt: new Date("2017-08-28T00:00:00.00")
  };
 
  CancelResponse: CancelResponse;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private TradeService: TradeService,
    //private LoginService: LoginService,
    //private storage: Storage,
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
  setopenlang() {
    this.openlanguage = !this.openlanguage;
  }
  setshowabout() {
    this.showabout = !this.showabout;
  }
}
