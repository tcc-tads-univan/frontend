import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCpfFormat]',
  standalone: true
})
export class CpfFormatDirective {
  @Input() appCpfFormat: boolean = true;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    if (this.appCpfFormat) {
      const inputElement = this.el.nativeElement as HTMLInputElement;
      let value = inputElement.value.replace(/\D/g, ''); // Remove non-digit characters
      if (value.length > 11) {
        value = value.slice(0, 11); // Limit to 11 digits
      }
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      inputElement.value = value;
    }
  }
}
