import { Component, ViewChild } from "@angular/core";
import { Events, MenuController, Nav, Platform ,App } from 'ionic-angular';
import { PopoverController, AlertController, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from '@ionic/storage';
import { LocalAuth, AuthProvider } from "../providers/auth/auth";
import { Subscription } from "rxjs";
import { session } from "./../interfaces/session.interface";

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) nav: Nav;
  
    // List of pages that can be navigated to from the left menu
    // the left menu only works after login
    // the login page disables the left menu
    rootPage: string ="TabsPage"; 
    
    app_Pages: PageInterface[] = [
      { title: 'Home',     name: this.rootPage,     component: this.rootPage, tabComponent: 'HomePage',       index: 0, icon: 'pie' },
      { title: 'Market',   name: this.rootPage,     component: this.rootPage, tabComponent: 'MarketPage',     index: 1, icon: 'analytics' },
      { title: 'News',     name: this.rootPage,     component: this.rootPage, tabComponent: 'NewsPage',       index: 2, icon: 'book' },
      { title: 'Settings', name: 'SettingsPage', component: 'SettingsPage', icon: 'settings' },
      { title: 'About',    name: 'AboutPage',    component: 'AboutPage',    icon: 'ios-beer-outline' },
    ];
    Trader_loggedIn_Pages: PageInterface[] = [
      { title: 'Trading',  name: 'TabsloggedinPage', component: 'TabsloggedinPage' , tabComponent: 'OnlinetradingPage', index: 3, icon: 'cart' },
      { title: 'Alert',    name: 'AlertPage', component: 'AlertPage', icon: 'notifications'},
      { title: 'Logout',   name: this.rootPage, component: this.rootPage , icon: 'log-out', logsOut: true }
    ];
    NonTrader_loggedIn_Pages: PageInterface[] = [
      { title: 'Alert',    name: 'TabsloggedinPage', component: 'TabsloggedinPage' ,  tabComponent: 'AlertPage',        index: 3, icon: 'notifications'},
      { title: 'Logout',   name: 'TabsPage', component: 'TabsPage' , icon: 'log-out', logsOut: true }
    ];
    loggedOut_Pages: PageInterface[] = [
      { title: 'Login',    name: 'TabsPage', component: 'TabsPage' ,   tabComponent: 'SigninPage',      index: 3, icon: 'log-in'}
    ];
    
    loggedInPages: PageInterface[];

    language: any;
    alert: any;
    subscription: Subscription;
    CurrentSession : session;

    constructor(
      public events: Events,
      public menu: MenuController,
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public popoverCtrl: PopoverController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public  app: App,
      public storage: Storage,
      public userData :AuthProvider,
    ) {
          // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial')
        .then((hasSeenTutorial) => {
          if (!hasSeenTutorial) {
            this.rootPage = 'TutorialPage';
          }
          this.platformReady()
        });

        // decide which menu items should be hidden by current login status stored in local storage
        this.subscription = this.userData.getMessage().subscribe(message => 
        { 
          this.CurrentSession = message.CurrentSession; 
          if(this.CurrentSession && 
            this.CurrentSession.result !=null && 
            this.CurrentSession.result.GeneralInfo &&
            this.CurrentSession.result.GeneralInfo.UserID >0)
          {
              if(this.CurrentSession.result.GeneralInfo.IsTrader)
              {
                this.enable_Trader_loggedIn_Menu();
                this.rootPage = 'TabsloggedinPage';
              }
              else
              {
                this.enable_NonTrader_loggedIn_Menu();
                this.rootPage = 'TabsloggedinPage';
              }
          }
          else
          {
              this.disable_loggedIn_Menu();
          }
        });

        this.disable_loggedIn_Menu();
        //this.listenToLoginEvents();
  }

  showError(text) {
    this.nav.setRoot('TabsPage', 0).catch((err: any) => {
      let alert = this.alertCtrl.create({
        title: 'Fail',
        message: text,
        cssClass:'cusm-alert-style',
        //subTitle: text,
        buttons: ['OK']
      });
      alert.present();
    });

  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    console.log(`page.name: ${page.name}`);
    console.log(`page.index: ${page.index}`);
    console.log(`Nav-GetActiveChildNavs-length: ${this.nav.getActiveChildNavs().length}`);
    
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
      this.nav.getActiveChildNavs()[0].select(page.index);
    } else {
      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    }
    
    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      //this.userData.logout();
        this.userData.logout().subscribe(succ => {
        //this.menuToast("out");
        this.disable_loggedIn_Menu();
        this.rootPage = 'TabsPage';
      });
    }
  }

  openTutorial() {
    this.nav.setRoot('TutorialPage',{rootPage :this.rootPage});
  }

  enable_Trader_loggedIn_Menu() {
    this.loggedInPages = this.Trader_loggedIn_Pages;

    this.menu.enable(true, 'loggedInMenu');
    this.menu.enable(false, 'loggedOutMenu');
  }

  enable_NonTrader_loggedIn_Menu() {
    this.loggedInPages = this.NonTrader_loggedIn_Pages;

    this.menu.enable(true, 'loggedInMenu');
    this.menu.enable(false, 'loggedOutMenu');
  }

  disable_loggedIn_Menu() {
    this.loggedInPages = [];

    this.menu.enable(true, 'loggedOutMenu');
    this.menu.enable(false, 'loggedInMenu');
  }
  getmenudir():string
  {
    return this.slidDir;
  }
  slidDir:string = "Right";
  platformReady() {
    // Call any initial plugins when ready
      this.platform.ready().then(() => {
        if(window["language"])
        {
          this.platform.setDir('rtl', window["language"]=="ar")
          this.slidDir = window["language"]=="ar"? "Right" : "Left";
        }
        else
        {
          this.platform.setDir('rtl', false)
          this.slidDir = "Right";
        }
        
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.platform.registerBackButtonAction(() => {
          
           let nav = this.app.getActiveNavs()[0];
           let i:number = 0
           let activeView = nav.getActive(); 
           var actname = ""; //activeView.name;
           for(i ; i< this.app.getActiveNavs.length; i++)
           {
              actname += this.app.getActiveNavs()[i].name + "<br>";
           }
           console.log("A-C-T-I-V--V-I-E-W: " + actname + "-----------------------");
           //if(activeView.name === "FirstPage") 
           {
        
               if (nav.canGoBack()){ //Can we go back?
                   nav.pop();
               } else {
                   const alert = this.alertCtrl.create({
                       title: 'App termination',
                       message: 'your Active current pageis:<br>  ' + actname + '<br> Do you want to close the app?',
                       buttons: [{
                           text: 'Cancel',
                           role: 'cancel',
                           handler: () => {
                               console.log('Application exit prevented!');
                           }
                       },{
                           text: 'Close App',
                           handler: () => {
                               this.platform.exitApp(); // Close this application
                           }
                       }]
                   });
                   alert.present();
               }
           }
       },100);
  
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];

    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'orang';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'orang';
    }
    return;
  }

  
  // listenToLoginEvents() {
  //   this.events.subscribe('user:login', () => {
  //     this.enableMenu(true);
  //   });

  //   this.events.subscribe('user:signup', () => {
  //     this.enableMenu(true);
  //   });

  //   this.events.subscribe('user:logout', () => {
  //     this.enableMenu(false);
  //   });
  // }

}
