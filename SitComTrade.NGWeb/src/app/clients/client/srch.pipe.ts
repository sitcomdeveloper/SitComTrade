import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'srch'
})
export class SrchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!args){
      return value;
    }
    return value.filter((val)=>{
      let rVal=(val.FirstName.toLocaleLowerCase().includes(args));
      return rVal;
    })
    
  }

}


// || (val.venue.toLocaleLowerCase().includes(args)) || (val.timing.toString().includes(args)) || (val.address.toLocaleLowerCase().includes(args)
