import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authpipe'
})
export class AuthpipePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
