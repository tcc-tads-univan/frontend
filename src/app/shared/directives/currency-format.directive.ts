import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true
})
export class CurrencyFormatDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: KeyboardEvent) {
    let inputValue: string = this.el.nativeElement.value;

    inputValue = inputValue.replace(/[^0-9.]/g, '');

    const formattedValue = this.formatCurrency(Number(inputValue));

    this.el.nativeElement.value = formattedValue;
  }

  private formatCurrency(value: number): string {
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
