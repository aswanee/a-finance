import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import {
  userorderhistoryresponse,
  PlaceType,
  OrderStatus,
  PriceType,
  OrderSide
} from "./../../interfaces/userorder.interface";
import { ToastController } from "ionic-angular";
import { TradeService } from "./../../providers/trade.service";
import { session } from "../../interfaces/session.interface";

@IonicPage()
@Component({
  selector: "page-orderhistory",
  templateUrl: "orderhistory.html"
})
export class OrderhistoryPage implements OnInit {
    
  GetTitleWithOrderid (title: string ): string {
    var t = title + " - " + this.orderid.toString()
    return t;
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

  buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}> = 
  [
    // {BName: "notifications", IconName: "notifications"},
    // {BName: "add", IconName: "add"},
    // {BName: "checkmark", IconName: "checkmark"}
  ];

  userorderhistoryresponse: userorderhistoryresponse;
  Session: session;
  orderid: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private TradeService: TradeService,
    private toastCtrl: ToastController
  ) {
    this.orderid = navParams.get("orderid");
    this.Session = navParams.get("Session");
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getorderhistory(this.orderid);
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderhistoryPage");
  }
  getorderhistory(orderid) {
    this.TradeService
      .getorderhistory(this.Session, window["isArabic"], orderid)
      .subscribe(
        data => {
          this.userorderhistoryresponse = data;
          if (this.userorderhistoryresponse.Status =="UnauthorizedOrOverrideToken") {
            throw "UnauthorizedOrOverrideToken at getorderhistory at Line 79"; 
          }
        },
        Error =>{
          throw Error; 
        }
      );
  }


  showOrderStatus(Status: OrderStatus): string {
    return OrderStatus[Status];
  }
  showOrderSide(Side: OrderSide): string {
    return OrderSide[Side];
  }
  showPriceType(Price: PriceType): string {
    return PriceType[Price];
  }
  showPlaceType(Place: PlaceType) {
    return PlaceType[Place];
  }
  ErrorToast() {
    let toast = this.toastCtrl.create({
      message: "Error!",
      duration: 2000,
      position: "top"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
