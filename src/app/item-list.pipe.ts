import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemListPipe'
})
export class ItemListPipe implements PipeTransform {

  transform(value: any, pipe: PipeTransform, ...args: any[]): any {

    if(!pipe)
      return value;

    return pipe.transform(value, args);
  }

}
