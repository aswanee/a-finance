import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from "@angular/core";
import { ToastController} from "ionic-angular";
import { Newsdetailsresponse } from "./../../interfaces/newsdetailsresponse.interface";
import { CompanyService } from "./../../providers/company.service";
import { FavoritesService } from "./../../providers/favorite.service";
import { AuthProvider } from './../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-newsdetails',
  templateUrl: 'newsdetails.html',
})
export class NewsdetailsPage {
  GetCustNavID(event) {
    switch(event)
    {
      case "add-star":
        console.log(event);
        this.pinThisItem()
        break;
      case "remov-star":
        console.log(event);
        this.unPinThisItem()
        break;
    }
  }

  buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}> = 
  [
    //  {BName: "flag", IconName: "flag", visable: true},
    //  {BName: "add" , IconName: "add"  , visable: true}
    // {BName: "checkmark", IconName: "checkmark", visable: true}
  ];

  
  //private _session: session;
  // get token(): session {
  //   var t: session = null;
  //   try {
  //     t = <session>window["session"];
  //   } catch (e) {
  //     this.ErrorToast("You Are Not Logged in!");
  //   }
  //   return t;
  // }
  
  pinned:boolean = false;
  FavID = 0;
  id: string;
  Newsbody: Newsdetailsresponse;
  elements: Element;
  isFired = false;
  constructor(
    private CompanyService: CompanyService,
    //private NavController: NavController,
    public navParams: NavParams,
    private ToastController: ToastController,
    private Favo : FavoritesService,
    private Auth: AuthProvider,
    //private platform: Platform,
    public navCtrl: NavController,
    
  ) {
    this.id = navParams.get("id");
  }

  /*
  ngOnInit() {
  }
  */
  LangDirection:string 
  
  ngOnInit() {

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
    {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
    }
    if(UserID>0)
    {
      this.buttons = [
        {BName: "remov-star", IconName: "star",  visable: false , IconColor:"orange"},//0-remove
        {BName: "add-star" , IconName: "star"  , visable: false, IconColor:""}//1-add
        ];
    }
    const parsed = Number(this.id);
    this.CompanyService.getnewsdetails(parsed,UserID).subscribe(
      data => {
        this.Newsbody = data;
        
        this.LangDirection = this.Newsbody.result.V[2].toLowerCase() =='true'?"rtl" : "ltr";

        var div = document.createElement("div");
        div.innerHTML = this.Newsbody.result.V[3];
        this.elements = div;
        //this.platform.setDir('rtl', true) 
        var favid :any = this.Newsbody.result.V[8];
        if(!isNaN(favid))
        {
          this.FavID = +favid;
          if(this.buttons.length>0)
          {
            if(this.FavID>0)
            {
              this.pinned = true;
              this.buttons[0].visable= true;
              this.buttons[1].visable= false;
            }
            else
            {
              this.buttons[0].visable= false;
              this.buttons[1].visable= true;
            }
          }
        }
        // document.writeln(this.elements.innerHTML);
        console.log(this.elements);
        document.getElementById("id").innerHTML = this.elements.innerHTML;
      },
      Error => {
        if (!this.isFired) {
          this.ErrorToast("Error!Please Check your Connectivity and restart the application");
          this.isFired = true;
        }
      }
    );
    // this.showdetails=true;
  }

  registerBackButton :any;
  ionViewDidEnter() {
  //   console.log("ionViewDidEnter");
  //   this.registerBackButton = this.platform.registerBackButtonAction(() => {
  //     console.log("YOU WILL GO BACK");
  //     if (this.navCtrl != undefined && this.registerBackButton!=undefined && this.navCtrl.canGoBack())
  //           this.navCtrl.pop();
  //  });
  }

  ionViewWillLeave() {
    // console.log("ionViewWillLeave");
    // this.registerBackButton = null;
  }

  
  ErrorToast(Message:string) {
    let toast = this.ToastController.create({
      message: Message,
      duration: 2000,
      position: "bottom"
    });

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }

  pinThisItem()
  {
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
      {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
      }

      if(!this.pinned && UserID > 0)
      {
        this.pinned = true;
        this.Favo.AddFavorite(UserID.toString(),this.Newsbody.result.V[0]).subscribe(
          data => {
            this.buttons[0].visable= true;
            this.buttons[1].visable= false;
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast("Error!Please Check your Connectivity and restart the application");
              this.isFired = true;
            }
          }
        );
        console.log("this.pinned =" + this.pinned);
      }
  }

  unPinThisItem()
  {
    var UserID = 0;
    if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
      && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
      {
        UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
      }

    if(this.pinned && UserID > 0)
    {
      //this.Favo.RemoveFavorite_test(this.Newsbody.result.V[0]);
      this.Favo.RemoveFavorite(this.Newsbody.result.V[0], UserID.toString(), this.Newsbody.result.V[8]).subscribe(
        data => {
          this.buttons[0].visable=false ;
          this.buttons[1].visable= true;
  
          var locDate :any = data;
          this.pinned = false;
          console.log(locDate);
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast("Error!Please Check your Connectivity and restart the application");
            this.isFired = true;
          }
        }
      );      
      console.log("this.pinned =" + this.pinned);
    }
  }
}

