import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { AlertUpdatePage } from './alert-update';

@NgModule({
  declarations: [
    AlertUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(AlertUpdatePage),
    PipesModule,
    CustNavModule,
  ],
  exports: [
    AlertUpdatePage,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]

})
export class AlertUpdatePageModule {}
