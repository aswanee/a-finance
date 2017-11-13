import { Component,  HostListener } from "@angular/core";
import { MarketResponse } from "./../../interfaces/Marketresponse.interface";
import { MarketService } from "./../../providers/market.service";
import { NavController, IonicPage } from "ionic-angular";
import { SerResponse } from "./../../interfaces/response.interface";
import { ToastController } from "ionic-angular";
import { marketRefresh } from "./../../providers/refreshconfig";


@IonicPage()
@Component({
  moduleId: "./../../app/app.module.ts",
  selector: "page-market",
  templateUrl: "market.html"
})
export class MarketPage {

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


  lastFveDays: boolean = false;
  // lstFveDays70: boolean = false;
  // lstFveDays100: boolean = false;

  index: number = 0;
  IndicesTable: MarketResponse;
  show30: boolean = true;
  show70: boolean = false;
  show100: boolean = false;
  PerformersTable: MarketResponse;
  EGX30: SerResponse;
  EGX70: SerResponse;
  showChart: boolean = true;
  stockchosen: boolean = false;
  isSmall: boolean = true;
  anotherbool: boolean = true;
  reuter: string;
  EGX100: SerResponse;
  Indices: SerResponse[] = new Array();
  BP: SerResponse;
  rootid: number = 1;
  BV: SerResponse;
  WP: SerResponse;
  SelectedPerform:string = "BP";
  isFired = false;
  dorefresh = true;
  initialized = false;
  egx30Selected : string = "Selected"
  egx70Selected : string = ""
  egx100Selected : string = ""
  egx30Dir:string = "";
  egx70Dir:string = "";
  egx100Dir:string = "";

  egx30DirRow:string = "";
  egx70DirRow:string = "";
  egx100DirRow:string = "";
  constructor(
    public navCtrl: NavController,
    private MarketService: MarketService,
    private ToastController: ToastController
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    console.log("Width: " + event.target.innerWidth);
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }
  setPerform(ActivOne:string)
  {
    this.SelectedPerform = ActivOne;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.MarketService.getindicestable().subscribe(
      data => {
        this.IndicesTable = data;
        console.log(this.IndicesTable);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformerstable().subscribe(data => {
      this.PerformersTable = data;
      console.log(this.PerformersTable);
    });
    this.MarketService.getindices("EGX30").subscribe(
      data => {
        this.EGX30 = data;
        if(this.EGX30)
        {
          this.showHideChart(0)
        }
        console.log(this.EGX30);
        //  this.Indices.push(this.EGX30);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getindices("EGX70").subscribe(
      data => {
        this.EGX70 = data;
        console.log(this.EGX70);
        //  this.Indices.push(this.EGX70);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getindices("EGX100").subscribe(
      data => {
        this.EGX100 = data;
        console.log(this.EGX100);
        //   this.Indices.push(this.EGX100);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("BP", window["isArabic"]).subscribe(
      data => {
        this.BP = data;
        console.log(this.BP);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("BV", window["isArabic"]).subscribe(
      data => {
        this.BV = data;
        console.log(this.BV);
      },
      Error => this.ErrorToast()
    );
    this.MarketService.getperformers("WP", window["isArabic"]).subscribe(
      data => {
        this.WP = data;
        console.log(this.WP);
      },
      Error => this.ErrorToast()
    );
    console.log(this.Indices);
    this.initialized = true;
  }
  ionViewDidEnter() {
    this.dorefresh = true;
    this.refresh();
  }
  ionViewWillLeave() {
    this.dorefresh = false;
  }
  egxDir(olddir,newVal,oldval,indexname)
  {
    var newDir="";
    if(newVal == oldval)
    {
      return newDir;
    }

    if(newVal>oldval)
    {
      if(olddir=='fadeUp')
      {
        newDir = 'fadeUp2';
      }
      else
      {
        newDir = 'fadeUp';
      }
    }
    else if(newVal<oldval)
    {
      if(olddir=='fadeDown')
      {
        newDir = 'fadeDown2';
      }
      else
      {
        newDir = 'fadeDown';
      }
    }

    return newDir
  }
  refresh() {
    this.Indices = new Array();
    this.MarketService.getindicestable().subscribe(
      data => {
        this.IndicesTable = data;
        console.log(this.IndicesTable);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getperformerstable().subscribe(
      data => {
        this.PerformersTable = data;
        console.log(this.PerformersTable);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX30").subscribe(
      data => {
        var newVal = eval(data.result[0][1]);
        var OldVal = 0;
        var row = 0;
        if(this.EGX30 && this.EGX30.result && this.EGX30.result.length>0)
        {
          OldVal = eval(this.EGX30.result[0][1]);
          row = eval(data.result[0][3]);
        }
        this.egx30DirRow = row>0?"RowUp":row<0?"RowDown":"";
        this.egx30Dir = this.egxDir(this.egx30Dir,newVal,OldVal,"30");
        this.EGX30 = data;

        console.log(this.EGX30);
        // this.Indices.push(this.EGX30);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX70").subscribe(
      data => {
        var newVal = eval(data.result[0][1]);
        var OldVal = 0;
        var row = 0;
        if(this.EGX70 && this.EGX70.result && this.EGX70.result.length>0)
        {
          OldVal = eval(this.EGX70.result[0][1]);
          row = eval(data.result[0][3]);
        }
        this.egx70DirRow = row>0?"RowUp":row<0?"RowDown":"";

        this.egx70Dir = this.egxDir(this.egx70Dir,newVal,OldVal,"70");
        this.EGX70 = data;
        console.log(this.EGX70);
        // this.Indices.push(this.EGX70);
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast();
          this.isFired = true;
        }
      }
    );
    this.MarketService.getindices("EGX100").subscribe(data => {
      var newVal = eval(data.result[0][1]);
      //var OldVal = eval(this.EGX100.result[0][1]);
      //var row = eval(this.EGX100.result[0][3]);
      var OldVal = 0;
      var row = 0;
      if(this.EGX100 && this.EGX100.result && this.EGX100.result.length>0)
      {
        OldVal = eval(this.EGX100.result[0][1]);
        row = eval(data.result[0][3]);
      }
      this.egx100DirRow = row>0?"RowUp":row<0?"RowDown":"";
      this.egx100Dir = this.egxDir(this.egx100Dir,newVal,OldVal,"100");
      
      this.EGX100 = data;
      console.log(this.EGX100);
      //  this.Indices.push(this.EGX100);
    });
    switch(this.SelectedPerform)
    {
      case "BP":
        this.MarketService.getperformers("BP", window["isArabic"]).subscribe(
          data => {
            this.BP = data;
            console.log(this.BP);
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast();
              this.isFired = true;
            }
          }
        );
      break;
      case "BV":
        this.MarketService.getperformers("BV", window["isArabic"]).subscribe(
          data => {
            this.BV = data;
            console.log(this.BV);
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast();
              this.isFired = true;
            }
          }
        );
        break;
      case "WP":
      this.MarketService.getperformers("WP", window["isArabic"]).subscribe(
        data => {
          this.WP = data;
          console.log(this.WP);
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast();
            this.isFired = true;
          }
        }
      );
      break;
    }

    if (this.dorefresh) {
      setTimeout(() => {
        this.refresh();
      }, marketRefresh);
      console.log("refresh");
    }
  }
  setstockchosen(reuter: string) {
    this.stockchosen = true;
    this.reuter = reuter;
    this.anotherbool = false;
    this.goToCompanyDeatils();
  }

  resetstockchosen() {
    this.stockchosen = false;
    this.anotherbool = true;
  }

  showHideChart(i: number) {
    this.index = i;
    switch (i) {
      case 0:
        this.show30 = true;
        this.show70 = false;
        this.show100 = false;
        this.egx30Selected  = "Selected"
        this.egx70Selected  = ""
        this.egx100Selected = ""
      
        break;
      case 1:
        this.show30 = false;
        this.show70 = true;
        this.show100 = false;
        this.egx30Selected  = ""
        this.egx70Selected  = "Selected"
        this.egx100Selected = ""
        
        break;
      case 2:
        this.show30 = false;
        this.show70 = false;
        this.show100 = true;
        this.egx30Selected  = ""
        this.egx70Selected  = ""
        this.egx100Selected = "Selected"
        break;
      default:
        break;
    }
  }
  getstockchosen(stockchosen) {
    this.stockchosen = stockchosen;
    console.log(this.stockchosen);
  }
  showLastFiveDays() {
    this.lastFveDays = !this.lastFveDays;
  }
  goToCompanyDeatils() {
    this.navCtrl.push("CompanydetailsPage", {
      reuter: this.reuter,
      rootid: this.rootid,
      stockchosen: this.stockchosen
    });
  }
  ErrorToast() {
    let toast = this.ToastController.create({
      message: "Error!",
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  ChartParts :string = "IntraDay";
  isIntraDays :boolean = true;

  showIntraDays() {
    this.ChartParts = "IntraDay";
    this.isIntraDays = true;
    this.lastFveDays = true;
  }
  showHistoricalDays() {
    this.ChartParts = "Historical";
    this.isIntraDays = false;
    this.lastFveDays = false;
  }
}
