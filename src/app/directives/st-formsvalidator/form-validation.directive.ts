import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';

@Directive({
  selector: '[appFormValidation]',
})
export class FormValidationDirective {
  @Input() set appFormValidation(value: any) {}
  constructor(
    private tempRef: TemplateRef<any>,
    private viewRef: ViewContainerRef
  ) {}
}
