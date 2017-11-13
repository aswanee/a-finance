import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { AboutPage } from './about';

@NgModule({
  declarations: [
    AboutPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPage),
    PipesModule,
    CustNavModule,
  ],
  entryComponents:[
    AboutPage,
  ],
  exports:[
    AboutPage,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]
})
export class AboutPageModule {}
