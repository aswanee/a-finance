import { NgModule } from "@angular/core";
import { LanguagePipe } from "./Language/Language.pipe";
import { aroundToPipe } from "./around-to/around-to";
import { LimitToPipe } from "./limit-to/limit-to";
 @NgModule({
       declarations: [
           LanguagePipe,
           aroundToPipe,
           LimitToPipe,
    ],
       imports: [

       ],
       exports: [ 
           LanguagePipe,
           aroundToPipe,
           LimitToPipe,
        ],

})
export class PipesModule {}
