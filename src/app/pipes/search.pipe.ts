import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
     name: 'filter',
     pure: false
})
@Injectable()
export class SearchPipe implements PipeTransform{
     transform(items: any, term:string, secondTerm: string):any{
          if(!term || !items){
               return items;
          }
        if(secondTerm || secondTerm === ""){
          return SearchPipe.colFilter(items, term, secondTerm);
        }else{
          return SearchPipe.filter(items, term);
        }
     }

     static filter(items:Array<{[key:string]: any}>, term: string): Array<{[key:string]: any }>{
          const toCompare = term.toLowerCase(); 
          
        let result = items.filter(function (item: any) {
               let value, property;
               for (property in item) {
                    value = item[property];
               
                    if (value === null) {
                         continue;
                    }else{
                         // If object is 2 level deep than searching is supported
                         if(typeof(value) === "object"){
                              continue;
                         }
                         
                         if (value.toString().toLowerCase().includes(toCompare)) {
                              return true;
                         }
                    }
               }
               return false;
          });

        // if(result.length === 0){
        //     result.push({'isNoRecord': true});
        // }
        return result;
     }

     static colFilter(items:Array<{[key:string]: any}>, colName: string, colValue: string): Array<{[key:string]: any }>{
      const toCompare = colValue.toLowerCase(); 
      let colArray = colName.split('.'),
        result = items.filter(function (item: any) {
           let i, value = item;

            for(i=0; i<colArray.length; i++){
              value = value[colArray[i]];
            }
            if (value === null) {
                  return false;
            }else{
              if (value.toString().toLowerCase().includes(toCompare)) {
                  return true;
              }
            }
           return false;
      });

    // if(result.length === 0){
    //     result.push({'isNoRecord': true});
    // }
    return result;
 }
}