import {Component, ViewChild} from '@angular/core';
import {ViewController} from 'ionic-angular';
import { StockService } from "./../../providers/stock.service";
import { SerResponse } from "./../../interfaces/response.interface";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;
  isArabic:boolean=true;
  List: SerResponse;
  @ViewChild('SearchInput') myInput ;

  constructor (public viewCtrl: ViewController, 
     private StockService: StockService
  ) 
  {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    this.isArabic = window["isArabic"];
    this.StockService.getnames(this.isArabic).subscribe(
      data => {
        this.List = data;   
      }
    )
  }
  ngAfterViewChecked() {
    setTimeout(() => {
      this.myInput.setFocus();
    },150);
  }    

  
  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }
  
  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let  input: any= this.autocomplete.query.toLocaleLowerCase();
    let me = this;
    this.autocompleteItems = []; 
    this.List.result.forEach(
      function (item) 
      {
        var rauter:string = item[0].toLowerCase();
        var CompName : String = item[1].toLocaleLowerCase();
       if(rauter.includes(input) || CompName.includes(input))
       {
        me.autocompleteItems.push(item);
       }
      }
    );
          
  }
}