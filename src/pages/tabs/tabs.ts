import { Component } from "@angular/core";
import { IonicPage, Tabs,NavParams,NavController, Events} from "ionic-angular";
import { Subscription } from "rxjs";
import { AuthProvider } from "../../providers/auth/auth";
import { session } from "../../interfaces/session.interface";

@IonicPage()
@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "SigninPage";
  mySelectedIndex: number;
  TabIcon:string="log-in";
  DynamicTitle:string="Login";
  subscription: Subscription;
  CurrentSession : session;
  
  constructor(public userData :AuthProvider, public events: Events, navParams: NavParams) {
    this.listenToLoginEvents();
    this.mySelectedIndex = navParams.data.tabIndex || 0;

    this.subscription = this.userData.getMessage().subscribe(message => { 
      this.CurrentSession = message.CurrentSession; 
      if(this.CurrentSession && 
         this.CurrentSession.result != undefined && 
         this.CurrentSession.result != null && 
         this.CurrentSession.result.GeneralInfo && 
         this.CurrentSession.result.GeneralInfo.UserID > 0 )
      {
        this.tab4Root = "OnlinetradingPage";
        this.TabIcon ="cart";
        this.DynamicTitle= "Trades";

      }
      else
      {
        this.tab4Root = "SigninPage";
        this.TabIcon ="log-in";
        this.DynamicTitle= "Login";
      }
      // if(this.CurrentSession && this.CurrentSession.result !=null && this.CurrentSession.result.GeneralInfo && this.CurrentSession.result.GeneralInfo.IsTrader && this.CurrentSession.result.GeneralInfo.UserID >0)
      // {
      //     this.enableMenuTrader(true);
      // }
      // else
      // {
      //     this.enableMenuTrader(false);
      // }
    });

  }
  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.tab4Root = "SigninPage";
      this.TabIcon ="log-in";
      this.DynamicTitle= "Login";
    });

    this.events.subscribe('user:logout', () => {
      this.tab4Root = "OnlinetradingPage";
      this.TabIcon ="cart";
      this.DynamicTitle= "Trades";
    });
  }
}
