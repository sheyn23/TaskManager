import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.sass']
})
export class ErrorPageComponent {

  constructor(
    private readonly location: Location
  ) { }

  goBack(): void {
    this.location.back();
  }
}
