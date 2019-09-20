import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kommaSeperated'
})
export class KommaSeperatedPipe implements PipeTransform {

  transform(value: any[], propertyName: string = 'name'): any {
    
    let outputString: string = '';

    for (let index = 0; index < value.length; index++) {
      const element = value[index];
      
      outputString += element[propertyName];

      if(index < value.length - 1) {
        outputString += ', ';
      }      
    }
    
    return outputString;
  }

}
