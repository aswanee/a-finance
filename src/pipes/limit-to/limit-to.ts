import { Pipe, PipeTransform } from "@angular/core";

/**
 * Generated class for the LimitToPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: "limitTo"
})
export class LimitToPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let limit = args ? parseInt(args[0], 10) : 10;
    let trail = "...";

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
