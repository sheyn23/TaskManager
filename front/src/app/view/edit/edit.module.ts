import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from '@view/edit/edit.component';
import { EditRoutingModule } from '@view/edit/edit-routing.module';

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    EditComponent,
  ],
})
export class EditModule { }
