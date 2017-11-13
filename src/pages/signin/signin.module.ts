import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
    PipesModule,
    CustNavModule,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class SigninPageModule {}
