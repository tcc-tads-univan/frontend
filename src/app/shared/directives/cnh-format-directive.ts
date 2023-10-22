import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCnhFormat]',
  standalone: true
})
export class CnhFormatDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let value = inputElement.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }


    if (value.length >= 4) {
      value = value.slice(0, 4) + ' ' + value.slice(4);
    }
    if (value.length >= 9) {
      value = value.slice(0, 9) + ' ' + value.slice(9);
    }

    inputElement.value = value;
  }
}
