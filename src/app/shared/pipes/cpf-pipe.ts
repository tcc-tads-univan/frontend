import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat',
  standalone: true
})
export class CpfPipe implements PipeTransform {
  transform(value: string): string {
    value = value.replace(/\D/g, '');

    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
  }
}
