import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';

@Pipe({
    name: 'even',
    pure:false
})

export class evenPipe implements PipeTransform {
    transform(value: Array<number>,number:Number) {
        return (value.filter(x => x % 2 == 0 &&x<number));
    }

}