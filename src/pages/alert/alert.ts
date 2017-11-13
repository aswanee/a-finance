import {
  Component,
  SimpleChanges,
  HostListener, OnInit
} from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertService } from "./../../providers/alert.service";
import { alertresponse, alert } from "./../../interfaces/alert.interface";
import { Storage } from "@ionic/storage";
import { ToastController } from "ionic-angular";
import { session } from "./../../interfaces/session.interface";

@IonicPage()
@Component({
  selector: "page-alert",
  templateUrl: "alert.html"
})
export class AlertPage implements OnInit {

   
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

  SelectedSegment:string= "MatchedAlerts";
  isSmall: boolean = false;
  //private alertForm: FormGroup;
  addAlertForm: boolean = false;
  dispnames: any[][] = new Array();
  userAlerts: alertresponse;
  userId: number;
  Session: session;
  alertsLastDate = new Date("2017-1-10");
  matchedAlerts: alert[] = new Array();
  nonMatchedAlerts: alert[] = new Array();
  newMatchedAlerts: alert[] = new Array();
  newNonMatchedAlerts: alert[] = new Array();
  dummyAlert: alert;
  isFired: false;
  loggedin: boolean = false;
  fetchedAlerts: boolean = false;
  Types: String[] = ["Index", "Stock", "OTC"];
  Fields: String[] = [
    "Last Trade",
    "Net Change",
    "Percentage Change",
    "VWAP",
    "Best Bid",
    "Best Ask",
    "Bid Size",
    "Ask Size",
    "Volume",
    "TurnOver",
    "Transactions",
    "High",
    "Low",
    "Total Bid Size",
    "Total Ask Size",
    "Value",
    "Intraday High",
    "Intraday Low"
  ];
  Criterias: String[] = ["Less Than", "Equal", "Greater Than"];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    //private formBuilder: FormBuilder,
    //private StockService: StockService,
    private AlertService: AlertService,
    private storage: Storage,
    private ToastController: ToastController
  ) {}
  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.isSmall = event.target.innerWidth < 414 ? true : false;
  }
  ngOnInit() {

    this.storage.keys().then(keys => {
      if (keys) {
        keys.forEach(key => {
          if (key === "session") {
            this.storage.get(key).then(val => {
              this.Session = val;
              this.loggedin = true;
              this.userId = this.Session.result.GeneralInfo.UserID;
              this.getAlerts();
            });
          } else if (key === "alerts") {
            this.storage.get(key).then(val => {
              this.matchedAlerts = val.m;
              this.nonMatchedAlerts = val.nm;
              this.alertsLastDate = val.lastUpdate;
              this.fetchedAlerts = true;
            });
          }
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes["loggedin"].currentValue &&
      changes["fetchedAlerts"].currentValue
    ) {
      this.getAlerts();
    }
  }

  getAlerts() {

    this.AlertService.getUseralerts(this.userId, this.alertsLastDate).subscribe(
      data => {
        if (data) {
          this.newMatchedAlerts = data.result[0].filter(item => {
            return item.IsMatched;
          });
          this.newNonMatchedAlerts = data.result[0].filter(item => {
            return !item.IsMatched;
          });
        }
        console.log(this.SelectedSegment);
        if (this.newNonMatchedAlerts || this.newMatchedAlerts) {
          this.storage.set("alerts", {
            m: this.matchedAlerts = [...this.matchedAlerts , ...this.newMatchedAlerts],
            nm: this.nonMatchedAlerts = [...this.nonMatchedAlerts , ...this.newNonMatchedAlerts],
            // m: this.matchedAlerts.concat(this.newMatchedAlerts),
            // nm: this.nonMatchedAlerts.concat(this.newNonMatchedAlerts),
            lastUpdate: new Date()
          });
        }
      },
      Error => this.ErrorToast()
    );
  }
  JsonToDateString (param:string):string{
    if(param && param.length >10)
    {
      var toDate :Date = new Date(parseInt(param.substr(6)));
      var toStr:string = toDate.toLocaleDateString("en-US");
      //return toStr.replace("/","-")
      var newstr = toStr.split('/').reverse().join('-')
      return newstr;//toStr.replace(/\//g, "-");
      
    }
    else
    {
      return "";
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertPage");
  }

  showcreateAlertForm() {
    this.navCtrl.push("AlertCreatePage", {
      userId: this.userId,
      update: false
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  refreshAlerts() {
    this.AlertService.getUseralerts(this.userId, this.alertsLastDate).subscribe(
      data => {
        if (data) {
          this.newMatchedAlerts = data.result[0].filter(item => {
            return item.IsMatched;
          });
          this.newNonMatchedAlerts = data.result[0].filter(item => {
            return !item.IsMatched;
          });
        }
        if (this.newNonMatchedAlerts || this.newMatchedAlerts) {
          this.storage.set("alerts", {
            m: this.newMatchedAlerts,
            nm: this.newNonMatchedAlerts,
            lastUpdate: new Date()
          });
        }
      },
      Error => this.ErrorToast()
    );
  }

  alertDetails(index: number, IsMatched: boolean) {
    var alertId, reuter;
    if (IsMatched) {
      alertId = this.matchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    } else {
      alertId = this.nonMatchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    }
    this.navCtrl.push("AlertUpdatePage", {
      userId: this.userId,
      alertId: alertId,
      reuter: reuter
    });
    this.refreshAlerts();
  }

  deleteAlert(index: number, IsMatched: boolean) {
    var alertId, reuter;
    if (IsMatched) {
      alertId = this.matchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    } else {
      alertId = this.nonMatchedAlerts[index].AlertID;
      reuter = this.matchedAlerts[index].Code;
    }
    this.AlertService.deletealerts(alertId).subscribe(
      data => {
        // TODO: add toast here.
        if (data.result) {
          if (IsMatched) {
            this.matchedAlerts = this.matchedAlerts.filter(item => {
              return item.AlertID !== alertId;
            });
          } else {
            this.nonMatchedAlerts = this.nonMatchedAlerts.filter(item => {
              return item.AlertID !== alertId;
            });
          }
          this.storage.set("alerts", {
            m: this.matchedAlerts,
            nm: this.nonMatchedAlerts,
            lastUpdate: new Date()
          });
        }
      },
      Error => this.ErrorToast()
    );
  }
  ErrorToast() {
    let toast = this.ToastController.create({
      message: "Error!",
      duration: 2000,
      position: "bottom"
    });
  }
}
