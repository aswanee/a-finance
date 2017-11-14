import { Component, ViewChild } from "@angular/core";
import { Events, MenuController, Nav, Platform ,App } from 'ionic-angular';
import { PopoverController, AlertController, ToastController } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from '@ionic/storage';
import { LocalAuth, AuthProvider } from "../providers/auth/auth";

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
    /*
      tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "OnlinetradingPage";

    */
    appPages: PageInterface[] = [
      { title: 'Home', name: 'TabsPage',  component: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'pie' },
      { title: 'Market', name: 'TabsPage', component: 'TabsPage', tabComponent: 'MarketPage', index: 1, icon: 'analytics' },
      { title: 'News', name: 'TabsPage', component: 'TabsPage', tabComponent: 'NewsPage', index: 2, icon: 'book' },
      { title: 'About', name: 'TabsPage', component: 'TabsPage', tabComponent: 'AboutPage', index: 3, icon: 'ios-beer-outline' },
      { title: 'Settings', name: 'SettingsPage', component: 'SettingsPage', icon: 'settings' },
    ];
    loggedInPages: PageInterface[] = [
      // { title: 'Account', name: 'AccountPage', component: AccountPage, icon: 'person' },
      { title: 'Trading', name: 'TabsPage', component: 'OnlinetradingPage', icon: 'cart' },
      { title: 'Alert',  name:  'TabsPage',   component: 'AlertPage', icon: 'Alert' },
      { title: 'Logout', name: 'TabsPage',  component: 'TabsPage', icon: 'log-out', logsOut: true }
    ];
    loggedOutPages: PageInterface[] = [
      { title: 'Login', name: 'SigninPage', component: 'SigninPage', icon: 'log-in' },
      // { title: 'Support', name: 'SupportPage', component: SupportPage, icon: 'help' },
      // { title: 'Signup', name: 'SignupPage', component: SignupPage, icon: 'person-add' }
    ];

    rootPage: string ;  
    language: any;
    alert: any;
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
      public userData :AuthProvider
      
    ) {
          // Check if the user has already seen the tutorial
        this.storage.get('hasSeenTutorial')
        .then((hasSeenTutorial) => {
          if (hasSeenTutorial) {
            this.rootPage = 'TabsPage';
          } else {
            this.rootPage = 'TutorialPage';
          }
          this.platformReady()
        });
        this.userData.getUserInfo().then((hasLoggedIn) => {
          this.enableMenu(hasLoggedIn === true);
        });
        this.enableMenu(true);
    
        this.listenToLoginEvents();
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
      this.userData.logout();
    }
  }

  openTutorial() {
    this.nav.setRoot('TutorialPage');
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  platformReady() {
    // Call any initial plugins when ready
    this.platform.ready().then(() => {
      if(window["language"]=="ar")
      {
        this.platform.setDir('rtl', true)
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
}
