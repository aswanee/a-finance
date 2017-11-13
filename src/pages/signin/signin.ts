import { Component } from '@angular/core';
import { Platform,NavController, NavParams ,AlertController, LoadingController, Loading} from 'ionic-angular';
import { AuthProvider ,LocalAuth} from '../../providers/auth/auth';
import { User } from '../../interfaces/session.interface';
//import { ViewChild, OnInit } from "@angular/core";
import { IonicPage, } from 'ionic-angular';

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
  constructor(private navCtrl: NavController, 
    private auth: AuthProvider, 
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
    
    if(this.auth.StorageAuth && this.auth.StorageAuth.save == true)
    {
      this.registerCredentials.username = this.auth.StorageAuth.username;
      this.registerCredentials.password = this.auth.StorageAuth.password;
      this.saveme = this.auth.StorageAuth.save;
    }
    else
    {
      this.registerCredentials.username = "";
      this.registerCredentials.password = "";
      this.saveme = false;
    }

    //
  //   this.registerBackButton = this.platform.registerBackButtonAction(() => {
  //     console.log("YOU WILL GO BACK");
  //     if (this.navCtrl != undefined && this.registerBackButton!=undefined && this.navCtrl.canGoBack())
  //           this.navCtrl.pop();
  //  },this.perurity);
  //  this.perurity-+2;
  }

  ionViewWillLeave() {
  //   this.registerBackButton = this.platform.registerBackButtonAction(() => {
  //     console.log("YOU WILL GO BACK");

  //  },this.perurity);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }
  loacal_auth:LocalAuth ={ save:false, username:"", password:"" } ;

  public login() {
    
    
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        //var returnPage =this.navParams.get("ParentPage");
        //if(!returnPage)
        //returnPage = "OnlinetradingPage";
        this.navCtrl.setRoot("OnlinetradingPage");
        if(this.saveme)
        {
          this.auth.StorageAuth.username = this.registerCredentials.username;
          this.auth.StorageAuth.password = this.registerCredentials.password;
          this.auth.StorageAuth.save = true;
        }
        else
        {
          this.auth.StorageAuth.username = "";
          this.auth.StorageAuth.password = "";
          this.auth.StorageAuth.save = false;
        }
        this.auth.setStorageAuth().subscribe(data=>{});
        //this.navCtrl.push(OnlinetradingPage);
      } else {
        this.showError("Access Denied");   
      }
    },
      error => {
        this.showError(error);
      });
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
