import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ManagerModule } from './view/manager/manager.module';
import { AppRoutingModule } from './app-routing.module';
import { EditModule } from './view/edit/edit.module';
import { TaskModule } from './view/task/task.module';
import { ErrorPageModule } from './view/error-page/error-page.module';

import { AppComponent } from './app.component';
import { DataService } from './share/services/data.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
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
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
