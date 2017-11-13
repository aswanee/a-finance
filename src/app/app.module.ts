import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpModule } from "@angular/http";
import { Badge } from '@ionic-native/badge';

import { TradeService } from "../providers/trade.service";
import { MarketService } from "../providers/market.service";
import { CompanyService } from "../providers/company.service";
import { StockService } from "../providers/stock.service";
import { AskBidService } from "../providers/asksbids.service";
import { GetService } from "../providers/else.service";
import { IonicStorageModule } from "@ionic/storage";
import { AlertService } from "../providers/alert.service";
import { FavoritesService } from "../providers/favorite.service";
import { AuthProvider } from '../providers/auth/auth';

import { NewsPageModule } from "../pages/news/news.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { OnlinetradingPageModule } from "../pages/onlinetrading/onlinetrading.module";


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    TabsPageModule,
    NewsPageModule,
    OnlinetradingPageModule,
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    StockService,
    AskBidService,
    AlertService,
    TradeService,
    CompanyService,
    MarketService,
    GetService,
    SplashScreen,
    Badge,
    FavoritesService,
    AuthProvider
  ],  
  exports: [
  ]
  
})
export class AppModule {}
