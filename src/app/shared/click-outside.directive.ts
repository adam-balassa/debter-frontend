import { Directive, EventEmitter, Input, Output, ElementRef, TemplateRef, ViewContainerRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[clickOut]'
})
export class ClickOutsideDirective implements OnInit {

  @Output() clickOutChange = new EventEmitter<boolean>();
  @Input('clickOut') set displayed(condition: boolean) {
    setTimeout(() => {
      this.shallDisplay = condition;
    }, 50);
    if (!condition) {
      this.viewCont.clear();
      return;
    }
    this.viewCont.createEmbeddedView(this.template);
  }

  shallDisplay = false;

  constructor(
    protected renderer: Renderer2,
    protected template: TemplateRef<any>,
    protected viewCont: ViewContainerRef) { }

  ngOnInit(): void {
    this.renderer.listen(document, 'click', (event) => {
      const element = this.viewCont.element.nativeElement.nextElementSibling;
      if (element === null) return;
      if (!element.contains(event.target) && this.shallDisplay)
        this.clickOutChange.emit(false);
    });
  }
}
