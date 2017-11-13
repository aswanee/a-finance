import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderhistoryPage } from './orderhistory';
import { PipesModule } from '../../pipes/pipes.module';
import { CustNavModule } from '../../components/cust-nav/custnav.module';

@NgModule({
  declarations: [
    OrderhistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderhistoryPage),   
     PipesModule,
     CustNavModule,
    
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class OrderhistoryPageModule {}
