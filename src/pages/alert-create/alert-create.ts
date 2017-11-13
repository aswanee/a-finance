import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { StockService } from "./../../providers/stock.service";
import { AlertService } from "./../../providers/alert.service";
import {Type, Criteria, Field } from "./../../interfaces/alert.interface";
import { ToastController } from "ionic-angular";


@IonicPage()
@Component({//
  selector: "page-alert-create",
  templateUrl: "alert-create.html"
})
export class AlertCreatePage {

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
  Fields: any = new Array(
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
  );
  Criterias: any = new Array("Less Than", "Equal", "Greater Than");

  private alertForm: FormGroup;
  types: Type;
  types_num: number[];
  fields: Field;
  criterias: Criteria;
  reuters: string[] = new Array();
  userId: number;
  update: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private StockService: StockService,
    private AlertService: AlertService,
    private ToastController: ToastController
  ) {
    this.alertForm = this.formBuilder.group({
      reuter: ["", Validators.required],
      feild: ["", Validators.required],
      type: ["", Validators.required],
      criteria: ["", Validators.required],
      value: ["", Validators.required],
      note: [""]
    });
    this.userId = navParams.get("userId");
    this.update = navParams.get("userId");
  }

  ngOnInit() {
    this.StockService.getnames(window["isArabic"]).subscribe(data => {
      var d = data.result;
      var length = d.length;
      for (var index = 0; index < length; index++) {
        this.reuters.push(d[index][0]);
      }
    }, Error => this.ErrorToast);

  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AlertCreatePage");
  }

  addAlert() {
    // if (this.reuters.indexOf(this.alertForm.value.reuter.toString()) > 0) {

    this.AlertService
      .addalert(
        this.userId,
        this.alertForm.value.reuter.toString(),
        this.Fields.indexOf(this.alertForm.value.feild.toString()),
        this.Types.indexOf(this.alertForm.value.type.toString()),
        this.Criterias.indexOf(this.alertForm.value.criteria.toString()),
        this.alertForm.value.value,
        this.alertForm.value.note
      )
      .subscribe(
        data => {
          this.navCtrl.popToRoot();
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

    toast.onDidDismiss(() => {
      console.log("Dismissed toast");
    });

    toast.present();
  }
}
