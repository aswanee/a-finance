import { Pipe, PipeTransform } from "@angular/core";

/**
 * Generated class for the aroundToPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: "aroundTo"
})
export class aroundToPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args):string {
    if(isNaN(value))
    {
          return value;
    }
    else
    {
          let prec  :number = args[0];
          let ValueN:number = Number(value);
          let limit :string = ValueN.toFixed(prec);
          return  limit ;
    }
  }
}
