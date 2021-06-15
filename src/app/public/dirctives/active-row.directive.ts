import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appActiveRow]'
})
export class ActiveRowDirective {
  isClick:boolean = false;

  @Input('appActiveRow') color: string;

  @HostListener('click', ['$event']) onClick(e: Event) {
    this.isClick = true;
    this.elm.nativeElement.style.backgroundColor = this.color;
  }

  constructor(
    private elm: ElementRef<HTMLTableRowElement>,
  ) { }

  ngAfterViewInit() {
    this.listnerClickTbody();
  }

  private listnerClickTbody() {
    this.elm.nativeElement.closest('tbody').addEventListener("click", () => {
      if (this.isClick)
        this.isClick = false;
      else
        this.elm.nativeElement.style.backgroundColor = 'white';
    });
  }
}
