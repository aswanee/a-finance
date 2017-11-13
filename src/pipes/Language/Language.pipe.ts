import { Pipe, PipeTransform } from "@angular/core";
import { ArabicDictionary, EnglishDictionary } from "./../../providers/dictionary";

@Pipe({ name: "Language", pure: false })
export class LanguagePipe implements PipeTransform {
  constructor() {}
  transform(value: string): string {
    var lang:string= value
    if (window["language"] === "ar")
    {
      lang = ArabicDictionary[value];
    }
    else
    {
      lang = EnglishDictionary[value];
    }
    return lang;
  }
}
