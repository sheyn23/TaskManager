import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    EditComponent
  ],
})
export class EditModule { }