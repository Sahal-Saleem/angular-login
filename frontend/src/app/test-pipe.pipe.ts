import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testPipe'
})
export class TestPipePipe implements PipeTransform {

  transform(number: number): string {
    return `$ ${number}.00`;
  }

}
