import { Component } from '@angular/core';
import { Platform,NavController, NavParams ,AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthProvider ,LocalAuth} from '../../providers/auth/auth';
import { User, session } from '../../interfaces/session.interface';
//import { ViewChild, OnInit } from "@angular/core";
import { IonicPage, } from 'ionic-angular';
import { Subscription } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

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

  perurity = 101;
  loading: Loading;
  registerCredentials :User;
  //ParentPage :string;
  saveme:any = false;
  subscription: Subscription;
  CurrentSession : session;

  constructor(private navCtrl: NavController, 
    private userData: AuthProvider, 
    private alertCtrl: AlertController, 
    private loadingCtrl: LoadingController,
    public navParams: NavParams,
    private platform: Platform)
  { 
    //this.ParentPage = navParams.get("ParentPage");
    this.registerCredentials = new User("","");
  }
  registerBackButton :any;
  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    
    if(this.userData.StorageAuth && this.userData.StorageAuth.save == true)
    {
      this.registerCredentials.username = this.userData.StorageAuth.username;
      this.registerCredentials.password = this.userData.StorageAuth.password;
      this.saveme = this.userData.StorageAuth.save;
    }
    else
    {
      this.registerCredentials.username = "";
      this.registerCredentials.password = "";
      this.saveme = false;
    }
  }

  ionViewWillLeave() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  loacal_auth:LocalAuth ={ save:false, username:"", password:"" } ;

  public login() {
    if (
      this.registerCredentials.username === null || 
      this.registerCredentials.username === "" || 
      this.registerCredentials.password === null || 
      this.registerCredentials.password === ""
    ) {
      this.showError("Please insert credentials");
    } 
    else 
    {
      this.showLoading();
      
      this.subscription = this.userData.getMessage().subscribe(message => { 
        this.CurrentSession = message.CurrentSession; 
        if(this.CurrentSession && 
           this.CurrentSession.result != undefined && 
           this.CurrentSession.result != null && 
           this.CurrentSession.result.GeneralInfo && 
           this.CurrentSession.result.GeneralInfo.UserID > 0 )
        {
  
          this.navCtrl.setRoot("OnlinetradingPage");
        }
        else
        {
          this.showError("Access Denied");   
        }
      });
      this.userData.login(this.registerCredentials,this.saveme)
    }
  }

  
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true,
      cssClass:'cusm-alert-style'
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      message: text,
      cssClass:'cusm-alert-style',
      //subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
