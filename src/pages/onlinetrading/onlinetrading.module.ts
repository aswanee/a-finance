import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';
import { OnlinetradingPage } from './onlinetrading';
//import { LimitToPipe } from "../../pipes/limit-to/limit-to";
import { SigninPageModule } from '../signin/signin.module';

@NgModule({
  declarations: [
    OnlinetradingPage,
    //LimitToPipe,
  ],
  imports: [
    IonicPageModule.forChild(OnlinetradingPage),
    PipesModule,
    CustNavModule,
    SigninPageModule,
  ],
  entryComponents:[
  ],
  exports: [
    OnlinetradingPage,
    //LimitToPipe,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class OnlinetradingPageModule {}
