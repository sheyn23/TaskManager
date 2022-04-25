import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    ErrorPageComponent
  ],
})
export class ErrorPageModule { }
