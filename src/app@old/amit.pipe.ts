import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amit'
})
export class AmitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return 'mukul';
  }

}
