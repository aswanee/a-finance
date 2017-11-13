import { Component, Output, EventEmitter } from "@angular/core";
import { NavController,App } from "ionic-angular";
import { ViewController } from "ionic-angular";
//import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
//import { LanguagePipe } from "./../../pipes/Language/Language.pipe";
import { AuthProvider } from "./../../providers/auth/auth";
import { session } from "./../../interfaces/session.interface";

@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {
  @Output() onLogout = new EventEmitter<boolean>();



  get loggedIn(): boolean {
    if(this.Session && this.Session.result && this.Session.result.GeneralInfo.UserID > 0)
    return true;
    else return false;
  }
  
  //rootPage: any = "TabsPage";
  multiaccounts: boolean = false;
  Session: session ;
  ChosenAccount: string = "";
  constructor(
    public viewCtrl: ViewController,
    private navCtrl: NavController,
    //private storage: Storage,
    private toastCtrl: ToastController,
    private Auth : AuthProvider,
    //private platform :Platform,
    public  app: App,
  ) 
  {
    // this.navCtrl.setRoot(HomePage);
    this.Session = Auth.getUserInfo();
    //this.text = 'Hello World';
  }

  registerBackButton :any;
  ionViewDidEnter() {
  //   console.log("ionViewDidEnter");
  //   this.registerBackButton = this.platform.registerBackButtonAction(() => {
  //     this.close();
  //  });
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
    // this.registerBackButton = null;
  }


  ngOnInit() {
    
        if (this.loggedIn  ) {
          
          if (this.Session.result.UserAccounts.length === 0) {
            this.multiaccounts = false;
          } 
          else {
            this.multiaccounts = true;
          }
        }
      }


      logout() {
        console.log("Goodbay pop-over - logout")
        this.viewCtrl.dismiss().then(() => {
          this.Auth.logout().subscribe(succ => {
            this.menuToast("out");
          });
        });
      }
    
      goToAbout() {
        this.viewCtrl.dismiss().then(() => {
          this.app.getRootNav().push("AboutPage");
          // this.navCtrl.push("TabsPage", {PageId: "SettingsPage", TabRoot:2});
        });
      }
    
      goToSettings() {
        this.viewCtrl.dismiss().then(() => {
          this.app.getRootNav().push("SettingsPage");
        });
      }
    
      goToAlerts() {
        this.viewCtrl.dismiss().then(() => {
          this.app.getRootNav().push("AlertPage");
        });
      }
    
      login() {
        this.viewCtrl.dismiss().then(() => {
          this.app.getRootNav().push("SigninPage");
        });
      }
      gotoSwitch() {
        this.viewCtrl.dismiss().then(() => {
          this.app.getRootNav().push("SwitchAccountsPage", { Session: this.Session });
        });
      }
      // close() {
      //   this.viewCtrl.dismiss();
      // }
    
      menuToast(inOrOut: string) {
        let toast = this.toastCtrl.create({
          message: "You have logged " + inOrOut + " successfully",
          duration: 2000,
          position: "bottom"
        });
    
        toast.onDidDismiss(() => {
          console.log("Dismissed toast");
        });
    
        toast.present();
      }
}
