import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby'
})
export class SortbyPipe implements PipeTransform {

  transform(sortby: any[]): any[] {
    // Sort the brands alphabetically by name
    return sortby.sort((a, b) => a.name.localeCompare(b.name));
}


}
