import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.backgroundColor = 'yellow';
  }
}
