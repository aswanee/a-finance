import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';

import { NewsdetailsPage } from './newsdetails';
import { CustNavModule } from '../../components/cust-nav/custnav.module';

@NgModule({
  declarations: [
    NewsdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsdetailsPage),
    PipesModule,
    CustNavModule,
 ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class NewsdetailsPageModule {}
