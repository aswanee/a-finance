import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

//import { CustNavComponent } from '../../components/cust-nav/cust-nav'
import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { HomePage } from './home';
//import { CompanydetailsPageModule } from '../companydetails/companydetails.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule,
    CustNavModule,
    //CompanydetailsModule,
    //CompanydetailsPageModule,
    
  ],
  entryComponents:[
    HomePage,
  ],
  exports: [
    HomePage,
    //CustNavComponent,
    //PipesModule
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomePageModule {}
