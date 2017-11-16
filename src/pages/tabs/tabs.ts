import { Component } from "@angular/core";
import { IonicPage, NavParams} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "SigninPage";
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
