import {Directive, Input} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[enabledControl]'
})
export class EnabledControlDirective {
  constructor(private ngControl: NgControl) {
  }

  @Input()
  set enabledControl(condition: boolean) {
    if (this.ngControl) {
      if (this.ngControl.control) {
        if (condition) {
          this.ngControl.control.enable();
        } else {
          this.ngControl.control.disable();
        }
      }
    }
  }
}