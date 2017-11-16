import { Component ,ViewChild} from "@angular/core";
import { IonicPage, Tabs,NavParams,NavController, Events, App,Tab,} from "ionic-angular";
import { Subscription } from "rxjs";
import { AuthProvider } from "../../providers/auth/auth";
import { session } from "../../interfaces/session.interface";

@IonicPage()
@Component({
  selector: 'page-tabsloggedin',
  templateUrl: 'tabsloggedin.html',
})
export class TabsloggedinPage {


  tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "OnlinetradingPage";
  mySelectedIndex: number  ;
  DynamicTitle:string="Login";
  subscription: Subscription;
  CurrentSession : session;
  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 3;
  }
  // constructor(public userData :AuthProvider, public events: Events, navParams: NavParams,public  app: App, 
  //   tab :Tab) {
  //   //this.listenToLoginEvents();
  //   this.mySelectedIndex = navParams.data.tabIndex || 0;

  //   this.subscription = this.userData.getMessage().subscribe(message => 
  //   { 
  //       this.isLoggedIn = false;
  //       this.myLoggedTabs.add;
        
  //       this.CurrentSession = message.CurrentSession; 
  //       if(this.CurrentSession && 
  //          this.CurrentSession.result != undefined && 
  //          this.CurrentSession.result != null && 
  //          this.CurrentSession.result.GeneralInfo && 
  //          this.CurrentSession.result.GeneralInfo.UserID > 0 )
  //       {
  //         this.isLoggedIn = true;
  //         if(this.CurrentSession.result.GeneralInfo.IsTrader)
  //         {
  //           //this.tab5Root = "OnlinetradingPage";
  //           this.DynamicTitle = "Trades";
  //           //this.TabIcon ="cart";
  //           setTimeout(() => {
  //             this.mySelectedIndex = 0;
  //           }, 1000);

            
  //           // var obj = this.app.getRootNavs();
  //           // obj = obj[0]._children[0];
  //           // console.log(obj);
  //         }
  //         else
  //         {
  //           this.tab4Root = "AlertPage";
  //           this.DynamicTitle= "Alert";
  //           this.TabIcon ="Alert";
  //           this.mySelectedIndex = 3;
  //         }
  //       }
  //       else
  //       {
  //         this.tab4Root = "SigninPage";
  //         this.DynamicTitle= "Login";
  //         this.TabIcon ="log-in";
  //         this.mySelectedIndex = 0;
  //       }
  //   });

  // }

}
