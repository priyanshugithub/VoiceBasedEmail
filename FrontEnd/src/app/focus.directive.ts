import {Directive, Input, EventEmitter, ElementRef, Renderer, Inject} from '@angular/core';
 
@Directive({
  selector: '[focus]'
})
export class FocusDirective {
  @Input('focus') focusEvent: EventEmitter<boolean>;
 
  constructor(@Inject(ElementRef) private _element: ElementRef, private _renderer: Renderer) {
  }
 
  ngOnInit() {
    this.focusEvent.subscribe(event => {
      this._renderer.invokeElementMethod(this._element.nativeElement, 'focus', []);
    });
  }
 
 
}