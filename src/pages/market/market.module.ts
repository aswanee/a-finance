import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//import { CustNavComponent } from '../../components/cust-nav/cust-nav'
import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { MarketPage } from './market';
//import { CompanydetailsPageModule } from '../companydetails/companydetails.module';
import { ChartComponentModule } from '../../components/chart/chart.module';

@NgModule({
  declarations: [
    MarketPage,
  ],
  imports: [
    IonicPageModule.forChild(MarketPage),
    PipesModule,
    CustNavModule,
    ChartComponentModule,
    //CompanydetailsPageModule,
  ],
  exports: [
    MarketPage,
  ],
  entryComponents:[
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MarketPageModule {}
