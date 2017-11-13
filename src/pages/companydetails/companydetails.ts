import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, Input, Output, EventEmitter, SimpleChanges } from "@angular/core";
import { ToastController } from "ionic-angular";
import { SerResponse } from "./../../interfaces/response.interface";
import { Detailsresponse } from "./../../interfaces/details.interface";
import { Newsresponse } from "./../../interfaces/newsresponse.interface";
import { StockService } from "./../../providers/stock.service";
import { asksbidsRefresh, relnewsRefresh, tradesRefresh } from "./../../providers/refreshconfig";
import { AskBidService } from "./../../providers/asksbids.service";
import { CompanyService } from "./../../providers/company.service";
import { GetService } from "./../../providers/else.service";

@IonicPage()
@Component({
  selector: 'page-companydetails',
  templateUrl: 'companydetails.html',
})
export class CompanydetailsPage {

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
 
   @Input() id: string;
   rootid: number;
   @Input() hidewatchlast: boolean;
   @Output() send: EventEmitter<boolean> = new EventEmitter<boolean>();
   @Output() sendhide: EventEmitter<boolean> = new EventEmitter<boolean>();
   showasksbids: boolean = false;
   shownews = false;
   isFired = false;
   detailsresponse: Detailsresponse;
   showtrades: boolean = false;
   showrelatednews: boolean = false;
   showdetails: boolean = false;
   Asks: SerResponse;
   Bids: SerResponse;
   Stocksimple: SerResponse;
   Trades: Detailsresponse;
   relNews: Newsresponse;
   reuter;
   TradesArray: string[][] = new Array();
   LastTradID : number=0;
   ChartParts : string = "IntraDay"
   isIntraDays : boolean = true;
   asksbidsinitialized = false;
   tradesinitialized = false;
   newsinitialized = false;
   QueteParts: string = "News";
   constructor(
     private StockService: StockService,
     private CompanyService: CompanyService,
     private AskBidService: AskBidService,
     private GetService: GetService,
     private navCtrl: NavController,
     private toastCtrl: ToastController,
     public navParams: NavParams
   ) {
     this.reuter = navParams.get("reuter");
     this.rootid = navParams.get("rootid");
     this.LastTradID =0;
     this.QueteParts = "News";
 
   }
   ngOnInit() {}
   ngOnChanges(changes: SimpleChanges) {
     //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
     //Add 'implements OnChanges' to the class.
 
     if (changes["reuter"] && changes["reuter"].currentValue) {
       this.StockService.getstockdetails(this.reuter, true).subscribe(
         data => {
           this.detailsresponse = data;
         },
         Error => {
           if (!this.isFired) {
             this.ErrorToast();
             this.isFired = true;
           }
         }
       );
       let reuterarr: string[] = new Array();
       reuterarr.push(this.reuter);
       this.StockService.getstock(reuterarr, true).subscribe(
         data => {
           this.Stocksimple = data;
         },
         Error => {
           if (!this.isFired) {
             this.ErrorToast();
             this.isFired = true;
           }
         }
       );
     } else {
     }
   }
   ionViewDidEnter() {
     this.setnews();
 
     this.shownews = true;
     this.QueteParts = "News";
   }
   ionViewWillLeave() {
     this.showasksbids = false;
     this.shownews = false;
     this.showtrades = false;
   }
   setasksbids() {
     this.AskBidService.getasks(this.reuter).subscribe(
       data => {
         this.Asks = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.AskBidService.getbids(this.reuter).subscribe(
       data => {
         this.Bids = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.showasksbids = true;
     this.showtrades = false;
     this.shownews = false;
     this.refreshAsksBids();
   }
   refreshAsksBids() {
     this.AskBidService.getasks(this.reuter).subscribe(
       data => {
         this.Asks = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.AskBidService.getbids(this.reuter).subscribe(
       data => {
         this.Bids = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     if (this.showasksbids) {
       setTimeout(() => {
         this.refreshAsksBids();
       }, asksbidsRefresh);
     }
   }
   settrades() {
     this.GetService.getquotetrades(this.reuter, this.LastTradID).subscribe(
       data => {
         if(data && data.result && data.result.length>0)
         {
           this.LastTradID =Number(data.result[0][0]);          
         }
         if(!this.Trades)
         {
           this.Trades= {status:"", result:[]}
         }
         var TempTrades: string[]=[];
         TempTrades = data.result;
         
         this.Trades.result = TempTrades.concat(this.Trades.result);
 
         this.showtrades = true;
         
         if (this.showtrades) {
           setTimeout(() => {
             this.settrades();
           }, tradesRefresh);
         }
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.showasksbids = false;
     this.shownews = false;
     //this.refreshAutoTrades();
   }
 
   
 
   refreshAutoTrades() {
     this.GetService.getquotetrades(this.reuter, this.LastTradID).subscribe(
       data => {
         this.Trades = data;
         for (let i = 0; i < this.Trades.result.length; i++) {
           this.TradesArray[i] = new Array();
         }
         for (let i = 0; i < this.Trades.result.length; i++) {
           this.TradesArray[i] = this.Trades.result[i].split(",");
 
           this.TradesArray[i][
             this.TradesArray[i].length - 1
           ] = this.TradesArray[i][this.TradesArray[i].length - 1].substring(
             0,
             this.TradesArray[i][this.TradesArray[i].length - 1].length - 1
           );
         }
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     if (this.showtrades) {
       setTimeout(() => {
         this.refreshAutoTrades();
       }, tradesRefresh);
     }
   }
   refreshTrades() {
     this.GetService.getquotetrades(this.reuter, 0).subscribe(
       data => {
         this.Trades = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.showtrades = true;
     // this.stockchosen = false;
     // this.send.emit(this.stockchosen);
     this.refreshedToast("Trades");
   }
 
   refreshAsks() {
     this.AskBidService.getasks(this.reuter).subscribe(
       data => {
         this.Asks = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.AskBidService.getbids(this.reuter).subscribe(
       data => {
         this.Bids = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.showasksbids = true;
     // this.stockchosen = false;
     // this.send.emit(this.stockchosen);
     this.refreshedToast("Asks and Bids");
   }
 
   showNews() {
     this.showrelatednews = true;
     this.showdetails = false;
   }
 
   refreshNews() {
     this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
       data => {
         this.relNews = data;
         this.refreshedToast("News");
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
   }
 
   setnews() {
     this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
       data => {
         this.relNews = data;
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     this.shownews = true;
     this.showasksbids = false;
     this.showtrades = false;
     this.refreshAutoNews();
   }
   refreshAutoNews() {
     this.CompanyService.getnewsrelated(this.reuter,window["isArabic"]).subscribe(
       data => {
         this.relNews = data;
         // this.refreshedToast("News");
       },
       Error => {
         if (!this.isFired) {
           this.ErrorToast();
           this.isFired = true;
         }
       }
     );
     if (this.shownews) {
       setTimeout(() => {
         this.refreshAutoNews();
       }, relnewsRefresh);
     }
   }
   getdetails(id) {
     this.showrelatednews = false;
     this.id = id;
     this.goToNewsDeatils();
     this.showdetails = !this.showdetails;
   }
 
   goback() {
     if (this.rootid === 1) {
       this.navCtrl.setRoot("MarketPage");
     } else {
       this.navCtrl.setRoot("HomePage");
     }
   }
 
   refreshedToast(refreshType: string) {
     let toast = this.toastCtrl.create({
       message: refreshType + " refreshed successfully",
       duration: 2000,
       position: "top"
     });
 
     toast.onDidDismiss(() => {
       console.log("Dismissed toast");
     });
 
     toast.present();
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
   showIntraDays() {
     this.ChartParts = "IntraDay";
     this.isIntraDays = true;
     //this.lastFveDays = !this.lastFveDays;
   }
   showHistoricalDays() {
     this.ChartParts = "Historical";
     this.isIntraDays = false;
     //this.lastFveDays = !this.lastFveDays;
   }
   goToNewsDeatils() {
     this.navCtrl.push("NewsdetailsPage", {
       id: this.id
     });
   }
}
