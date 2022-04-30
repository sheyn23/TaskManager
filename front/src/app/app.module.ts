import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import localeRu from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { EditModule } from '@view/edit/edit.module';
import { TaskModule } from '@view/task/task.module';
import { ManagerModule } from '@view/manager/manager.module';
import { ErrorPageModule } from '@view/error-page/error-page.module';

import { DataService } from '@services/data.service';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManagerModule,
    EditModule,
    TaskModule,
    ErrorPageModule,
    HttpClientModule
  ],
  providers: [
    DataService,
    { provide: LOCALE_ID, useValue: "ru" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
