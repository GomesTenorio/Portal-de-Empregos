import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMask]',
  standalone: true
})
export class MaskDirective {
  @Input('appMask') mask: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: any): void {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    
    if (this.mask === 'cnpj') {
      input.value = this.applyCnpjMask(value);
    } else if (this.mask === 'cep') {
      input.value = this.applyCepMask(value);
    } else if (this.mask === 'phone') {
      input.value = this.applyPhoneMask(value);
    }
  }

  private applyCnpjMask(value: string): string {
    if (value.length <= 14) {
      return value
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
    return value.substring(0, 14)
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  }

  private applyCepMask(value: string): string {
    if (value.length <= 8) {
      return value.replace(/(\d{5})(\d{1,3})$/, '$1-$2');
    }
    return value.substring(0, 8).replace(/(\d{5})(\d{1,3})$/, '$1-$2');
  }

  private applyPhoneMask(value: string): string {
    if (value.length <= 11) {
      if (value.length <= 10) {
        return value.replace(/(\d{2})(\d{4})(\d{1,4})$/, '($1) $2-$3');
      } else {
        return value.replace(/(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3');
      }
    }
    return value.substring(0, 11).replace(/(\d{2})(\d{5})(\d{1,4})$/, '($1) $2-$3');
  }
}