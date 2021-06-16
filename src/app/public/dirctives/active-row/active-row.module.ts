import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveRowDirective } from './active-row.directive';



@NgModule({
  declarations: [ActiveRowDirective],
  exports: [ActiveRowDirective],
  imports: [
    CommonModule
  ]
})
export class ActiveRowModule { }
