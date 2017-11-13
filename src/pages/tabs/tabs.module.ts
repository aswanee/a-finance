import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    PipesModule,
  ],
  exports: [
    TabsPage,
  ]
  
})
export class TabsPageModule {}
