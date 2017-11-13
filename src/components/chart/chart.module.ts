import { IonicModule } from 'ionic-angular';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ChartModule } from "angular2-highcharts";
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';


import { ChartComponent } from './chart';

export function highchartsFactory():HighchartsStatic {
	const hc =  require("highcharts/highstock");
	const hcm = require('highcharts/highcharts-more');
	const exp = require('highcharts/modules/exporting');
	hcm(hc);
	exp(hc);
  
	return hc;
  }
  
@NgModule({
	declarations: [ChartComponent],
	imports: [
		IonicModule,
	    ChartModule, 
	],
	exports: [ChartComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA],
	providers:[
	  {
		provide: HighchartsStatic,
		useFactory: highchartsFactory
	  }
	],
})
export class ChartComponentModule {}
