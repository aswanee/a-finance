import { Component, Input } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { NavParams } from "ionic-angular";
import "rxjs/add/operator/map";
import "rxjs/Rx";
import { ParentService } from "../../providers/parentservice.service";


@Component({
  selector: 'Com-chart',
  templateUrl: 'chart.html'
})
export class ChartComponent extends ParentService {

  link: string = "";
  d = [];
  received_json;
  @Input() isIntraDays: boolean;
  @Input() rouiterCode: string = "";
  @Input() ChartType: string = "";
  isArabic :boolean = true;
  options: Object;
  
  constructor(public navParams: NavParams,public http: Http)
  {
    super(http);
    this.getunsecurelink();
    this.link = this.link + "apis/market/GetSimpleChartWithinRange?Codes=";
    if(window["isArabic"])
    {
      this.isArabic =  window["isArabic"];
    }
    else {
      this.isArabic =false;
    }
    console.log('Hello ChartComponent Component');
    
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad ChartPage");
  }

  ngOnInit() {
    console.log('===============Hello ChartComponent ngOnInit==========');
    
    this.getchart(this.isIntraDays).subscribe(data => {
      this.received_json = data;
      var l = this.received_json.result.V.length;
      for (var index = 0; index < l; index++) {
        this.d.push([
          new Date(this.received_json.result.V[l - index - 1][0]).getTime(),
          Number(this.received_json.result.V[l - index - 1][2])
        ]);
      }
      this.options = {

      //title: { text: this.rouiterCode.toUpperCase() + " Stock Price" },
      //   rangeSelector: {
      //     buttons: [{
      //         type: 'hour',
      //         count: 1,
      //         text: '1h'
      //     }, {
      //         type: 'day',e

      //         count: 1,
      //         text: '1D'
      //     }, {
      //         type: 'all',
      //         count: 1,
      //         text: 'All'
      //     }],
      //     selected: 1,
      //     inputEnabled: false
      // },        
      colors: ['orange', '#F3B32A', '#F3B32A', '#F3B32A', '#F3B32A', '#F3B32A', 
      '#F3B32A', '#F3B32A', '#F3B32A'],
      chart: {
        backgroundColor: '#242424'
        
      },

      series: [
          {
            //type: 'candlestick',
            name: this.rouiterCode,
            data: this.d,
            tooltip: {
              valueDecimals: 2
            }
          }
        ],
         navigation: {
           buttonOptions: {
               enabled: false
           }
        },      
      //   exporting: {
      //     filename: 'event-id-metadata-graph',
      //      buttons: {
      //          contextButton: {
      //              menuItems: [{
      //                  text: 'Download PDF',
      //                  onclick: function () {
      //                      this.exportChart({
      //                          type: 'application/pdf'
      //                      });
      //                  }
      //              }, {
      //                  text: 'Print',
      //                  onclick: function () {
      //                          alert('Launch Print Table function')
      //                  },
      //                  separator: false
      //              }]
      //          }
      //      }
      //  }         
      };
    });
  }

  getchart(isIntra: boolean): Observable<any> {
    var date2 = new Date();
    var date = new Date();
    this.link += this.rouiterCode;
    this.link += "&from=";
    if (isIntra) {
      date2.setDate(date.getDay() - 5);
      this.link += date2.toISOString().substring(0, 10);
      this.link += "&to=";
      this.link += date.toISOString();
      this.link += "&isIntra=1";
    } else {
      date2.setFullYear(date.getFullYear() - 1);
      this.link += date2.toISOString().substring(0, 10);
      this.link += "&to=";
      this.link += date.toISOString();
      this.link += "&isIntra=0";
    }
    return this.http
      .get(this.link)
      .map(x => {
        return <any>x.json();
      })
      .catch((t: Response) => t.json());
  }
}
