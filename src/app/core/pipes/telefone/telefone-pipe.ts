import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone',
})
export class TelefonePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '').slice(0, 11);

    if (digits.length <= 10) {
      // fixo: (44) 3333-3333
      return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    }

    // celular: (44) 99999-0000
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
  }
}
