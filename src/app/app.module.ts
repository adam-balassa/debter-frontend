import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeHungary from '@angular/common/locales/hu';
import localeUS from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

registerLocaleData (localeHungary, 'hu');
registerLocaleData (localeUS, 'en');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
