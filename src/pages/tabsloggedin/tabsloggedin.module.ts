import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsloggedinPage } from './tabsloggedin';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TabsloggedinPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsloggedinPage),
    PipesModule,
  ],
  exports: [
    TabsloggedinPage,
  ]
  
})
export class TabsloggedinPageModule {}
