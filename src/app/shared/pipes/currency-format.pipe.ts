import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value) || value === null) {
      return '';
    }

    const formattedValue = value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });

    return formattedValue;
  }
}
