import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { AlertCreatePage } from './alert-create';

@NgModule({
  declarations: [
    AlertCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AlertCreatePage),
    PipesModule,
    CustNavModule,
  ],
  exports: [
    AlertCreatePage,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AlertCreatePageModule {}
