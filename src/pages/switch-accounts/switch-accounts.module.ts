
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SwitchAccountsPage } from './switch-accounts';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

@NgModule({
  declarations: [
    SwitchAccountsPage,
 ],
  imports: [
    IonicPageModule.forChild(SwitchAccountsPage),
    PipesModule,
    CustNavModule,
 ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class SwitchAccountsPageModule {}
