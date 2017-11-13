
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NewsPage } from './news';
import { CustNavComponent } from '../../components/cust-nav/cust-nav'
import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

@NgModule({
  declarations: [
    NewsPage,
    //CustNavComponent
  ],
  imports: [
    IonicPageModule.forChild(NewsPage),
    PipesModule,
    CustNavModule,
  ],
  entryComponents:[
    NewsPage,
  ],
  exports: [
    NewsPage,
    CustNavComponent
  ],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NewsPageModule {}
