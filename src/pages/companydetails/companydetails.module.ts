import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';

import { CompanydetailsPage } from './companydetails';
import { CustNavModule } from '../../components/cust-nav/custnav.module';
import { ChartComponentModule } from '../../components/chart/chart.module';

@NgModule({
  declarations: [
    CompanydetailsPage,
],
  imports: [
    IonicPageModule.forChild(CompanydetailsPage),
    PipesModule,
    CustNavModule,
    ChartComponentModule,
  ],
  entryComponents:[    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CompanydetailsPageModule {}
