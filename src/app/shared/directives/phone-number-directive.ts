import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneNumberFormat]',
  standalone: true
})
export class PhoneNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('keyup', ['$event.target.value'])
  onKeyUp(value: string) {
    const inputElement = this.el.nativeElement as HTMLInputElement;
    let formattedValue = '';
    let digitCount = 0;

    for (let i = 0; i < value.length; i++) {
      const char = value.charAt(i);
      if (/\d/.test(char)) {
        if (digitCount < 11) {
          formattedValue += char;
          digitCount++;
          if (digitCount === 2) {
            formattedValue = `(${formattedValue}) `;
          } else if (digitCount === 7) {
            formattedValue = `${formattedValue}-`;
          }
        }
      }
    }

    inputElement.value = formattedValue;
  }
}
