import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appTelefoneMask]',
})
export class TelefoneMask {
  constructor(private control: NgControl) { }

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;

    const digits = value.replace(/\D/g, '').slice(0, 11);
    let masked = '';

    if (digits.length <= 10) {
      masked = digits.replace(/(\d{0,2})(\d{0,4})(\d{0,4})/, (_, a, b, c) =>
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join('')
      );
    } else {
      masked = digits.replace(/(\d{0,2})(\d{0,5})(\d{0,4})/, (_, a, b, c) =>
        [a && `(${a}`, b && `) ${b}`, c && `-${c}`].filter(Boolean).join('')
      );
    }

    this.control.control?.setValue(masked, { emitEvent: false });
  }
}
