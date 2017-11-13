import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams ,ModalController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { session } from "../../interfaces/session.interface";
import { portfolioRefresh, ordersRefresh } from "./../../providers/refreshconfig";
import { TradeService } from "./../../providers/trade.service";
import { portfolioresponse } from "./../../interfaces/portfolio.interface";
import { AlertController } from "ionic-angular";
import { userorderhistoryresponse, userorderresponse, userorder,   } from "./../../interfaces/userorder.interface";
import { TimeTerm, OrderSide, OrderStatus, PriceType } from "./../../interfaces/userorder.interface";
import { OrderhistoryPage } from "./../orderhistory/orderhistory";
import { ValidationResponse, CancelResponse, OrderOperationResult } from "./../../interfaces/Validate.interface";
import { PlaceOrderStatus, PlaceResponse } from "./../../interfaces/Validate.interface";
import { ToastController } from "ionic-angular";
import { StockService } from "./../../providers/stock.service";
import { Equals } from "../../Lib/Compare";

@IonicPage()
@Component({
  selector: 'page-onlinetrading',
  templateUrl: 'onlinetrading.html',
})
export class OnlinetradingPage {
  
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

  username = '';
  email = '';
  userorderhistoryresponse: userorderhistoryresponse;
  UserOpenOrderResponse: userorderresponse;
  UserNotOpenOrderResponse: userorderresponse;
  portfolioresponse: portfolioresponse;
  Detailsresponse: any;
  showportfolio: boolean = false;
  showsummary = false;
  showorders = false;
  pincode: number = 0;
  showhistory = false;
  userorder: userorder = {
    PriceType: PriceType.Market /*Market -  Limited*/,
    TimeTerm: 0 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 0 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: null,
    Quantity: null,
    Username: "",
    CurrencyCode: "EGP",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: null,
    SymbolCode: "",
    ExpireAt: null,
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: null,
    strExpireAt: null
  };
  
  updateuserorder: userorder = {
    PriceType: 0 /*Market -  Limited*/,
    TimeTerm: 0 /*2- Good Till Day -4 Good Till week -5 Good Till month*/,
    BimsUserID: 0,
    ReutersCode: "",
    Side: 0 /*(2)Buy -(3) Sell -(4) Sell Same Day -(5) T+1*/,
    Price: 0,
    Quantity: 0,
    Username: "",
    CurrencyCode: "EGP",
    Status: 1 /*(1)Open, (2)Completed, (3)Expired, (4)Cancelled, (5)Partially Executed, (6)Pending Approval, (7)Rejected, (8)Suspended, (9)Invalid Order, (-2)Cancelled With Error*/,
    ExecutedQuantity: 0,
    details: [],
    ID: 0,
    BimsID: 0,
    OrderDate: null,
    SymbolCode: "",
    ExpireAt: null,
    BkeeperID: 4527,
    OrderReference: "",
    strOrderDate: null,
    strExpireAt: null
  };
  ValidationResponse: ValidationResponse;
  Updateresponse: PlaceResponse;
  Createresponse: PlaceResponse;
  CancelResponse: CancelResponse;
  showInsert = false;
  ShowUpdate: boolean[] = new Array();
  EnablePrice = true;
  timeout: number;
  SelectedSegment: string = "Portfolio";
  isArabic:boolean=true;
  OrderSearchItem:string[]=["","","","","",""];
  DirClass:string = "";
  OrdresData: Array<{id: string ,title: string, details: userorderresponse, icon: string, showDetails: boolean}> = [];
  //_Session : session ;

  get Session(): session {
    return this.auth.getUserInfo();
  }
  CheckSession() 
  {
    if(!this.Session || !this.Session.result || this.Session.result.GeneralInfo.UserID <= 0)
    {
      this.logout();
    }
  }
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private auth: AuthProvider,
    private TradeService: TradeService,
    //private storage: Storage,
    public alertCtrl: AlertController,
    private ToastController: ToastController,
    private modalCtrl: ModalController,
    private StockService: StockService,

  ) {

    this.UserOpenOrderResponse = {Status: "",result: []}
    this.UserNotOpenOrderResponse = {Status: "",result: []}
    
    let info = this.auth.getUserInfo();
    if(info && info.result && info.result.GeneralInfo.UserID > 0)
    {
      this.username = info.result.GeneralInfo.UserName;
      this.email = info.result.GeneralInfo.Email;
      this.SelectedSegment= "Portfolio";
      this.userorder.ReutersCode= '';
      this.OrdresData.push({
        id:"open",
        title: 'Open Orders ',
        details: this.UserOpenOrderResponse,
        icon: 'ios-remove-circle-outline',
        showDetails: true
      });
      this.OrdresData.push({
        id:"notopen",
        title: 'Not Open Orders ',
        details: this.UserNotOpenOrderResponse,
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }
    else
    {
      this.logout();
    }
  }
  
  Block : boolean= false;
  count : number = 0;
  public logout() {
    this.showhistory = false;
    this.showInsert = false;
    this.showorders = false;
    this.showportfolio = false;

    if(this.count === 0)
    {
      this.count++;
      this.Block = true
      this.auth.logout().subscribe(succ => {
        console.log("logout-subscribe Count : " + this.count);
        this.navCtrl.setRoot( "SigninPage",{ParentPage: OnlinetradingPage})
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Online tradin gPage');
    this.isArabic = window["isArabic"];
  }

  goToorderHistory(orderid) {
    this.CheckSession();

    this.navCtrl.push(OrderhistoryPage, {
      Session: this.Session,
      orderid: orderid
    }).catch(err=>{
      this.logout();
    });
  }

  ionViewDidEnter() {
    this.CheckSession();
    this.Block = false;
    
    this.showhistory = false;
    this.showInsert = false;
    this.showorders = false;
    this.showportfolio = false;

    if(this.SelectedSegment== "Orders" ) {
      this.showorders = true;
      this.getorders();
    }
    else if(this.SelectedSegment== "Insert" ) {
      this.showInsert = true;      
      this.ShowPlaceOrder();
    }
    else
    {
      this.SelectedSegment= "Portfolio";
      this.getportfolio();
      this.getportfoliosummary();
      this.showportfolio = true;
     }              

  }

  ionViewWillLeave() {
    this.showhistory = false;
    this.showInsert = false;
    this.showorders = false;
    this.showportfolio = false;
    for (let i = 0; i < this.ShowUpdate.length; i++) {
      this.ShowUpdate[i] = false;
    }
  }

 getportfolio() {
    
    this.isArabic = window["isArabic"];
    this.CheckSession();
    
    this.TradeService
      .GetPortfolio(this.Session, window["isArabic"])
      .subscribe(data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at GetPortfolio line 280"; 
        }
      }, Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );
    this.showportfolio = !this.showportfolio;
    this.showorders = false;
    this.showhistory = false;
    this.showInsert = false;
    this.refreshPortfolio();

  }


  refreshPortfolio() {

    this.isArabic = window["isArabic"];
    this.CheckSession();

    this.TradeService.GetPortfolio(this.Session, window["isArabic"]).subscribe(
      data => {
        this.portfolioresponse = data;
        if (this.portfolioresponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at GetPortfolio at Line 306"; 
        }
      },
      Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );
    this.getportfoliosummary();
    if (this.showportfolio) {
      setTimeout(() => {
        this.refreshPortfolio();
      }, portfolioRefresh);
    }
  }

  getportfoliosummary() { 
    this.CheckSession();
    
    this.TradeService.GetPortfolioSummary(this.Session).subscribe(
      data => {
        //console.log(data);
        if(data.result && data.result.length>0)
        {
          this.Detailsresponse = data.result[0];
        }
        if (data.status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at GetPortfolioSummary at Line 333"; 
        }
      },
      Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );
    this.showsummary = !this.showsummary;
  }

  getorders() {
    this.isArabic = window["isArabic"];
    this.CheckSession();
    
    this.TradeService.getorders(this.Session, window["isArabic"], 1).subscribe(
      data => {
        this.UserOpenOrderResponse = data;
        if (this.UserOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at getorders at Line 351"; 
        } 
        else {
          this.OrdresData[0].details = this.UserOpenOrderResponse;
          if(this.UserOpenOrderResponse.result.length <= 0)
          {
            this.OrdresData[0].showDetails = false;
          }
          for (let i = 0; i < this.UserOpenOrderResponse.Status.length; i++) {
            this.ShowUpdate[i] = false;
          }
        }
      },
      Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );

    this.TradeService.getorders(this.Session, window["isArabic"], 2).subscribe(
      data => {
        this.UserNotOpenOrderResponse = data;
        if (this.UserNotOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at getorders at Line 369"; 
        } 
        else {
          if(this.UserOpenOrderResponse.result.length>0 && this.UserNotOpenOrderResponse.result.length>0 )
          {
            this.OrdresData[0].showDetails = true;
          }
          this.OrdresData[1].details = this.UserNotOpenOrderResponse;
          for (let i = 0; i < this.UserNotOpenOrderResponse.Status.length; i++) {
            this.ShowUpdate[i] = false;
          }
        }
      },
      Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );

    this.showorders = true;
    this.showportfolio = false;
    this.showhistory = false;
    this.showInsert = false;
    // this.ShowUpdate = false;
    this.refreshOpenOrders();
  }

  refreshOpenOrders() {
    this.isArabic = window["isArabic"];
    this.CheckSession();
    
    this.TradeService
      .getorders(this.Session, window["isArabic"], 1)
      .subscribe(data => {
        if(data && data.result)
        {
          
          if(data.result.length != this.UserOpenOrderResponse.result.length)
          {
            this.UserOpenOrderResponse = data;
            console.log("UserOpenOrderResponse === data");
          }
          else
          {
            for(var i=0;i<data.result.length ;i++)
            {
              if(!Equals(data.result[i],this.UserOpenOrderResponse.result[i]))
              {
                console.log("UserOpenOrderResponse === data");
                this.UserOpenOrderResponse.result[i] = data.result[i];
              }
            }
          }
          this.OrdresData[0].details = this.UserOpenOrderResponse;
        }
        else
        {
          throw "ERROR  at if else at Line 418"; 
        }
        if (this.UserOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at Line 422"; 
        }
      }, Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      }
    );
    if (this.showorders) {
      setTimeout(() => {
        this.refreshOpenOrders();
      }, ordersRefresh);
    }
  }

  refreshNotOpenOrders() {
    this.isArabic = window["isArabic"];
    this.CheckSession();

    this.TradeService
      .getorders(this.Session, window["isArabic"], 2)
      .subscribe(data => {
        this.UserNotOpenOrderResponse = data;
        if (this.UserNotOpenOrderResponse.Status == "UnauthorizedOrOverrideToken") {
          throw "UnauthorizedOrOverrideToken at Line 445"; 
        }
        this.OrdresData[1].details = this.UserNotOpenOrderResponse;
        
      }, Error =>{
        this.ErrorToast("you are not logged in");
        this.logout();
      });
  }

  getorderhistory(orderid) {
    this.goToorderHistory(orderid);
  }

  CreateUpdateOrder() {
    // this.InitializeUserOrder();
    this.isArabic = window["isArabic"];
    this.CheckSession();
    
    if (this.EnablePrice) {

    } 
    else {
      this.userorder.Price = 0;
    }

    if (this.Session.result.UserAccounts.length === 0) {
      this.userorder.BimsUserID = this.Session.result.GeneralInfo.BIMSIAccountNumber;
    } else {
      this.userorder.BimsUserID = Number(this.Session.result.UserAccounts[0]);
    }
    this.userorder.Username = this.Session.result.GeneralInfo.UserName;
    this.TradeService
      .ValidateOrder(window["isArabic"], false, this.userorder, this.Session)
      .subscribe(
        data => {
          this.ValidationResponse = data;
          if (this.ValidationResponse.Status === "OK") {
            if (
              this.ValidationResponse.result.Result.toString() ===
              OrderOperationResult[OrderOperationResult.Success]
            ) {
              this.placeOrder();
            } else {
              alert(this.ValidationResponse.result.Message);
            }
          } 
          else if (this.ValidationResponse.Status == "UnauthorizedOrOverrideToken") {
            throw "UnauthorizedOrOverrideToken at Line 491"; 
          }
          else {
            alert("please insert all fields with Valid Values");
          }
        },
        Error =>{
          this.ErrorToast("you are not logged in");
          this.logout();
        });

  }

  placeOrder() {
    this.isArabic = window["isArabic"];
    this.CheckSession();
    
    this.pincode = Number(prompt("please enter the pin code"));
    this.TradeService
      .PlaceOrder(
        window["isArabic"],
        false,
        this.userorder,
        this.Session,
        this.pincode
      )
      .subscribe(
        data => {
          this.Createresponse = data;
          alert(this.Createresponse.result.OutMessages);
        },
        Error =>{
          this.ErrorToast("you are not logged in");
          this.logout();
        }
      );
  }

  UpdateOrder(order: userorder) {
    this.isArabic = window["isArabic"];
    
    this.updateuserorder.Username = this.Session.result.GeneralInfo.UserName;

    if (this.EnablePrice) {
    } else {
      this.updateuserorder.Price = 0;
    }
    this.TradeService
      .ValidateOrder(window["isArabic"], true, this.updateuserorder, this.Session)
      .subscribe(
        data => {
          this.ValidationResponse = data;
          if (this.ValidationResponse.Status === "OK") {
            if (
              this.ValidationResponse.result.Result.toString() ===
              OrderOperationResult[OrderOperationResult.Success]
            ) {
              this.pincode = Number(
                prompt(
                  this.ValidationResponse.result.Message +
                    "Please enter the Pin code"
                )
              );
              this.TradeService
                .PlaceOrder(
                  window["isArabic"],
                  true,
                  this.updateuserorder,
                  this.Session,
                  this.pincode
                )
                .subscribe(
                  data => {
                    this.Updateresponse = data;
                    alert(this.Updateresponse.result.OutMessages);
                    if (
                      this.Updateresponse.result.Status.toString() ===
                      PlaceOrderStatus[PlaceOrderStatus.Completed]
                    ) {
                      order = Object.assign({}, this.updateuserorder);
                    }
                  },
                  Error => this.ErrorToast("Error!")
                );
            } else {
              alert(this.ValidationResponse.result.Message);
            }
          } else {
            alert("Please Fill all Fields with valid values");
          }
        },
        Error =>{
          this.ErrorToast("you are not logged in");
          this.logout();
        });
  }

  CancelOrder(orderid: number) {
    this.isArabic = window["isArabic"];
    
    this.pincode = Number(prompt("please enter your pin code"));
    this.TradeService
      .CancelOrder(orderid, window["isArabic"], this.pincode, this.Session)
      .subscribe(
        data => {
          this.CancelResponse = data;
          alert(this.CancelResponse.result.OutMessages);
        },
        Error =>{
          this.ErrorToast("you are not logged in");
          this.logout();
        }
      );
  }



  ChooseDay() {
    this.userorder.TimeTerm = TimeTerm.Day;
    this.updateuserorder.TimeTerm = TimeTerm.Day;
  }

  ChooseWeek() {
    this.userorder.TimeTerm = TimeTerm.Week;
    this.updateuserorder.TimeTerm = TimeTerm.Week;
  }

  ChooseMonth() {
    this.userorder.TimeTerm = TimeTerm.Month;
    this.updateuserorder.TimeTerm = TimeTerm.Month;
  }

  ChooseMarket() {
    this.userorder.PriceType = PriceType.Market;
    this.updateuserorder.PriceType = PriceType.Market;
    this.EnablePrice = false;
  }

  ChooseLimit() {
    this.userorder.PriceType = PriceType.Limit;
    this.updateuserorder.PriceType = PriceType.Limit;
    this.EnablePrice = true;
  }

  ChooseBuy() {
    this.userorder.Side = OrderSide.Buy;
    this.updateuserorder.Side = OrderSide.Buy;
  }

  ChooseSell() {
    this.userorder.Side = OrderSide.Sell;
    this.updateuserorder.Side = OrderSide.Sell;
  }

  ChooseSellT0() {
    this.userorder.Side = OrderSide.Sell_T0;
    // this.updateuserorder.Side = OrderSide.Sell_T0;
    this.updateuserorder.Side = OrderSide.Sell_T0;
  }

  ChooseSellT1() {
    this.userorder.Side = OrderSide.Sell_T1;
    this.updateuserorder.Side = OrderSide.Sell_T1;
  }

  checkupdatability(userorder: userorder): boolean {
    if (
      userorder.Status === 1 ||
      userorder.Status === 5 ||
      userorder.Status === 6 ||
      userorder.Status === 8
    ) {
      return true;
    } else {
      return false;
    }
  }

  ChangeUpdate(id: number, order: userorder) {
    this.showportfolio = false;
    this.showhistory = false;
    this.showsummary = false;
    this.showInsert = false;
    // this.showorders = false;
    var lShowUpdate = true;
    for (let i = 0; i < this.UserOpenOrderResponse.result.length; i++) {
      if (id === i) {
        this.ShowUpdate[i] = true;
        lShowUpdate = false;
        this.updateuserorder = Object.assign({}, order);
        break;
      } 
      else {
        this.ShowUpdate[i] = false;
      }
    }
    this.showorders = lShowUpdate;
  }

  ShowPlaceOrder() {
    this.showInsert = true;
    this.showportfolio = false;
    this.showhistory = false;
    this.showsummary = false;
    // this.ShowUpdate = false;
    this.showorders = false;
    this.ChooseMarket();
  }
  


  showTimeTerm(Term: TimeTerm): string {
    return TimeTerm[Term];
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

  ErrorToast(message: string) {
    let toast = this.ToastController.create({
      message: message,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  setstockchosen(item: any){
    this.goToCompanyDeatils(item.ReutersCode,3,true);
  }

  goToCompanyDeatils(ReutersCode:string,rootid:number,stockchosen: boolean) {
    this.navCtrl.push("CompanydetailsPage", {
      reuter: ReutersCode,
      rootid: rootid,
      stockchosen: stockchosen
    });
  }
  clearSelected()
  {
    this.OrderSearchItem = ["","","","","",""];
    this.userorder.ReutersCode="";
  }
  Autocomplet(){
    let modal = this.modalCtrl.create("AutocompletePage");
    modal.onDidDismiss(data => {
      if(data)
      {      
        this.OrderSearchItem = data;
        this.userorder.ReutersCode = this.OrderSearchItem[0];
        this.StockService.getstock([this.OrderSearchItem[0]], this.isArabic).subscribe(
          data => {
            var Change :number = eval(data.result[0][1]);
            this.DirClass="";
  
            if(Change > 0)
            {
              this.DirClass="gainColor";
            }
            if(Change < 0)
            {
              this.DirClass="loosColor";
            }
            this.OrderSearchItem[3] = data.result[0][0];
            this.OrderSearchItem[4] = data.result[0][1];
            this.OrderSearchItem[5] = data.result[0][2];
          },
          Error => {
            // if (!this.isFired) {
            //   this.ErrorToast();
            //   this.isFired = true;
            // }
          }
        );
      }
    });
    modal.present();
  }

  toggleDetails(curElem) {
    this.OrdresData.forEach(element => {
      if(element === curElem)
      {
        if (curElem.showDetails) {
          curElem.showDetails = false;
          curElem.icon = 'ios-add-circle-outline';
        } else {
          curElem.showDetails = true;
          curElem.icon = 'ios-remove-circle-outline';
        }
      }
      else
      {
        element.showDetails = false;
        element.icon = 'ios-add-circle-outline';
      }
    });

  }




  GetOrdresData()
  {
    var xxx;
    xxx = this.OrdresData.filter(item => {item.details.result.length>0});
    return xxx;
  }





}
