import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';

import { CustNavComponent } from './cust-nav';
import { PipesModule } from '../../pipes/pipes.module';
//import { PopOverPageModule } from '../pop-over/pop-over';
//import { PopOverModule } from '../pop-over/pop-over.module';
import { PopoverComponent } from '../popover/popover';

@NgModule({
	declarations: [
		CustNavComponent,
		PopoverComponent,
	],
	imports: [
		IonicModule,
		PipesModule,
		
	],
	entryComponents:[
		PopoverComponent,
	],
	exports: [
		CustNavComponent,
		PopoverComponent,
		PipesModule,
	]
})
export class CustNavModule {}
