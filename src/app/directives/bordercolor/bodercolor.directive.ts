import {
  Directive,
  OnInit,
  Input,
  HostBinding,
  ElementRef,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appBodercolor]',
})
export class BodercolorDirective implements OnInit {
  @Input() defaultcolor: string = this.eleref.nativeElement.color;
  @Input('appBodercolor') bordercolor: string = 'red';
  @HostBinding('style.border-color') color = this.defaultcolor;
  constructor(private eleref: ElementRef) {}
  // @HostBinding('style.border-width') width: any = 1;
  ngOnInit(): void {
    this.color = this.defaultcolor;
  }

  @HostListener('mouseenter') mouseEnter(event: MouseEvent) {
    this.color = this.bordercolor;
    // this.width = 5;
  }

  @HostListener('mouseleave') mouseleave(event: MouseEvent) {
    this.color = this.defaultcolor;
    // this.width = this.eleref.nativeElement.borderWidth;
  }
}
