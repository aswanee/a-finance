import { Component } from "@angular/core";
import { IonicPage, Tabs,NavParams,NavController} from "ionic-angular";

@IonicPage()
@Component({
  templateUrl: "tabs.html",
})
export class TabsPage {
  tab1Root = "HomePage";
  tab2Root = "MarketPage";
  tab3Root = "NewsPage";
  tab4Root = "AboutPage";
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
