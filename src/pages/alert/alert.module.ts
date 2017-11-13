import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { AlertPage } from './alert';

@NgModule({
  declarations: [
    AlertPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertPage),
    PipesModule,
    CustNavModule,
  ],
  exports: [
    AlertPage,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AlertPageModule {}
