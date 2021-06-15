import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appInfiScroll]'
})
export class InfiScrollDirective {
  @Output() appInfiScrollEvent = new EventEmitter<void>();
  
  @HostListener('scroll', ['$event'])  onScroll(e){
    const tableViewHeight = e.target.offsetHeight;
    const tableScrollHeight = e.target.scrollHeight;
    const scrollLocation = e.target.scrollTop;

    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    
    if (scrollLocation > limit)
      this.appInfiScrollEvent.emit();
  }
}
