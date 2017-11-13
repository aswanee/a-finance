import { Component, OnInit ,OnDestroy} from "@angular/core";
import { IonicPage, NavController } from 'ionic-angular';
import { CompanyService } from "./../../providers/company.service";
import { Newsresponse } from "./../../interfaces/newsresponse.interface";
import { Newsdetailsresponse } from "./../../interfaces/newsdetailsresponse.interface";
import { ToastController } from "ionic-angular";
import { newsRefresh } from "./../../providers/refreshconfig";
import { Events } from "ionic-angular";
import { Storage } from "@ionic/storage";
import  { AuthProvider } from './../../providers/auth/auth';
import  { FavoritesService } from './../../providers/favorite.service';
import { Subscription } from 'rxjs/Subscription';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage implements OnInit,OnDestroy {
    //@ViewChild(CustNavComponent) cld : CustNavComponent
    News: Newsresponse;
    displayedMoreNews: Newsresponse;
    ArabicNews: string[][] = new Array();
    EnglishNews: string[][] = new Array();
    FavoriteNews: string [] ;
    //MoreNews: Newsresponse;
    Newsbody: Newsdetailsresponse;
    showdetails = false;
    NewestDate: string = "2017-7-1";
    OldestDate: string ;
    elements: Element;
    id: string;
    dorefresh: boolean = true;
    isFired = false;
    nLang:number = 2;
    buttons: Array<{BName: string, IconName: string, visable: boolean, IconColor:string}>;
    
    constructor(
      public navCtrl: NavController,
      private CompanyService: CompanyService,
      public events: Events,
      private ToastController: ToastController,
      private Storage: Storage,
      private Auth: AuthProvider,
      private Favo: FavoritesService
    ) {  }
    ngOnInit() {
      this.buttons = [
        // {BName: "add",           IconName: "add",          visable :false, IconColor:""},
        // {BName: "checkmark",     IconName: "checkmark",    visable :false, IconColor:""}
      ];
      //this.cld.buttons = buttons;
    }
  
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
    
    ionViewDidEnter() {
      this.dorefresh = true;
      this.refresh();
      this.GetFavoriteNews();
    }
  
  
    ionViewWillLeave() {
      this.dorefresh = false;
    }
  
  
    refresh() {
      this.CompanyService.getnews(this.NewestDate, 100, this.nLang).subscribe(
        data => {
          var len :number = data.result.V.length;
          if(data.result.V.length>0)
          {
            this.NewestDate = data.result.V[0][2] + ":" + data.result.V[0][3];
          }
          if(!this.News || this.News.result.V.length==0)
          {
            this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
            this.News = data;
            data.result.V.forEach(el => {
              if(el[5] == "True")
              {
                this.ArabicNews.push(el)
              }
              else
              {
                this.EnglishNews.push(el)
              }
            });
          }
          else
          {
            this.News.result.V = [...data.result.V,...this.News.result.V];
            this.News.result.N = data.result.N;
            this.News.status = data.status;
            var arnews : string[][] = new Array(); 
            var ennews : string[][] = new Array(); 
            data.result.V.forEach(el => {
              if(el[5] == "True")
              {
                arnews.push(el)
              }
              else
              {
                ennews.push(el)
              }
            });
            this.ArabicNews = [...arnews , ...this.ArabicNews];
            this.EnglishNews = [...ennews , ...this.EnglishNews];
            
          }
        },
        Error => {
          if (!this.isFired) {
            this.ErrorToast();
            this.isFired = true;
          }
        },()=>{
          if (this.dorefresh) {
            setTimeout(() => {
              this.refresh();
            }, newsRefresh);
          }
        }
      );
  
    }
  
    getdetails(id) {
      this.id = id;
      this.goToNewsDeatils();
  
      this.showdetails = true;
    }
  
    goToNewsDeatils() {
      this.navCtrl.push("NewsdetailsPage", {
        id: this.id
      });
    }
  
    More(evnt)  {
      this.CompanyService.getnewsRange(this.OldestDate, 10, this.nLang)
        .subscribe(
          data => {
            var len :number = 0;
            if(data.result.V.length > 0)
            {
              len = data.result.V.length;
              this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
            }
            
            if(!this.News || this.News.result.V.length == 0)
            {
              len = 0;
              len = data.result.V.length;
              this.NewestDate = data.result.V[0][2] + ":" + data.result.V[0][3];
              this.OldestDate = data.result.V[len-1][2] + ":" + data.result.V[len-1][3];
  
              this.News = data;
              data.result.V.forEach(el => {
                if(el[5] == "True")
                {
                  this.ArabicNews.push(el)
                }
                else
                {
                  this.EnglishNews.push(el)
                }
              });
            }
            else
            {
  
  
              var arnews : string[][] = new Array(); 
              var ennews : string[][]= new Array(); 
              var allnews : string[][]= new Array(); 
              allnews = data.result.V;
              allnews.forEach(el => {
                if(el[5] == "True")
                {
                  arnews.push(el)
                }
                else
                {
                  ennews.push(el)
                }
              });
              this.ArabicNews = [...this.ArabicNews , ...arnews];
              this.EnglishNews = [...this.EnglishNews, ...ennews];
              
  
              this.News.result.V =[...this.News.result.V,...data.result.V];
              this.News.result.N = data.result.N;
              this.News.status = data.status;
            }
            evnt.complete();
            
          },
          Error => {
            if (!this.isFired) {
              this.ErrorToast();
              this.isFired = true;
            }
          }
        );
    }
  
  
    SelectedSegment:string = "ArabicNews";
    getArabic() {
  
    }
  
    getEnglish() {
      
    }
  
    getAll(){
      
    }
  
 
    /////////////////////////////////==FAVORITE==//////////////////////////////////////////

    subscription: Subscription;
  
    ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.subscription.unsubscribe();
    }
  
    GetFavorite()  {
      
    }
  
    GetFavoriteNews()  {
        var UserID = 0;
        if(this.Auth.CurrentSession && this.Auth.CurrentSession.result 
        && this.Auth.CurrentSession.result && this.Auth.CurrentSession.result.GeneralInfo.UserID)
        {
          UserID = this.Auth.CurrentSession.result.GeneralInfo.UserID
        }
  
  
        if(UserID>0)
        {
          if(this.subscription) 
          {
              this.subscription = this.Favo.getMessage().subscribe(message => { this.FavoriteNews = message });
          }
          
          this.Favo.GetFavoriteNews(UserID.toString())
          .subscribe(
            data => {
              //if(data.V.length > 0)
              {
                this.FavoriteNews = this.Favo.FavoriteNews2
              }
            },
            Error => {
              if (!this.isFired) {
                this.ErrorToast();
                this.isFired = true;
              }
            }
          );
        }
    }
  
    RemoveFavoriteNews(key:number)  {
  
      this.Storage.get("Favorite").then(Favorites => {
        if(Favorites.length>0)
        {
          this.FavoriteNews = Favorites.filter((item)=> item.tid != key.toString());
        }
      });
      
      if(this.FavoriteNews)
          this.Storage.set("Favorite",this.FavoriteNews)
    }
  
    /////////////////////////////////==END FAVORITE==//////////////////////////////////////////
  
    ErrorToast() {
      let toast = this.ToastController.create({
        message:
          "Error!Please Check your Connectivity and restart the application",
        duration: 2000,
        position: "bottom"
      });
  
      toast.onDidDismiss(() => {
        console.log("Dismissed toast");
      });
  
      toast.present();
    }
}