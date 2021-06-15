import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfiScrollDirective } from '../infi-scroll.directive';



@NgModule({
  declarations: [InfiScrollDirective],
  exports: [InfiScrollDirective],
  imports: [
    CommonModule
  ]
})
export class InfiScrollModule { }
