import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from "../../pipes/pipes.module";
import { CustNavModule } from '../../components/cust-nav/custnav.module';

import { AutocompletePage } from './autocomplete';

@NgModule({
  declarations: [
    AutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(AutocompletePage),
    PipesModule,
    CustNavModule,
  ],
  exports: [
    AutocompletePage,
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA,
  ]

})
export class AutocompletePageModule {}
