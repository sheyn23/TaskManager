import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ManagerModule } from './view/manager/manager.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EditComponent } from './view/edit/edit.component';
import { TaskComponent } from './view/task/task.component';
import { ErrorPageComponent } from './view/error-page/error-page.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    TaskComponent,
    ErrorPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ManagerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
