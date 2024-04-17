import {
  Directive,
  ElementRef,
  Renderer2,
  OnInit,
  HostListener,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[appHovercolor]',
})
export class HovercolorDirective implements OnInit {
  private defaultWeight: number | string;
  @Input() defaultColors: string = this.el.nativeElement.style.color;
  @Input() highightColors: string = 'pink';
  @HostBinding('style.color') color: string = this.defaultColors;

  //

  //

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.defaultWeight = this.el.nativeElement.style.weight || 'normal';
  }

  ngOnInit() {
    this.color = this.defaultColors;
  }

  @HostListener('mouseenter') mouseenter(event: MouseEvent) {
    this.color = this.highightColors;
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
  }

  @HostListener('mouseleave') mouseleave(event: MouseEvent) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'font-weight',
      this.defaultWeight
    );
    this.color = this.defaultColors;
  }
}
