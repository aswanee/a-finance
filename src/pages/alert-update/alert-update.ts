import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { AlertService } from "./../../providers/alert.service";

@IonicPage()
@Component({
  selector: "page-alert-update",
  templateUrl: "alert-update.html"
})
export class AlertUpdatePage {
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

  private alertForm: FormGroup;

  userId: number;
  alertId: number;
  reuter: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private AlertService: AlertService
  ) {
    this.alertForm = this.formBuilder.group({
      feild: ["", Validators.required],
      type: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
    this.alertId = navParams.get("alertId");
    this.reuter = navParams.get("reuter");
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad UpdateAlertPage");
  }
  updateAlert() {
    this.AlertService
      .updatealerts(
        this.userId,
        this.reuter,
        this.alertId,
        this.Types.indexOf(this.alertForm.value.type.toString()),
        this.Fields.indexOf(this.alertForm.value.feild.toString()),
        this.Criterias.indexOf(this.alertForm.value.criteria.toString()),
        this.alertForm.value.value,
        this.alertForm.value.note.toString()
      )
      .subscribe(data => {
        this.navCtrl.popToRoot();
      });
  }
}
