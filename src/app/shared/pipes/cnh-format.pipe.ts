import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cnhFormat',
  standalone: true
})
export class CnhFormatPipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace(/\D/g, '');

    return `${value.slice(0, 4)} ${value.slice(4, 8)} ${value.slice(8)}`;
  }
}
