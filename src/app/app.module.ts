import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import localeHungary from '@angular/common/locales/hu';
import localeUS from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { registerLocaleData} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeHeaderComponent } from './home/home-header/home-header.component';
import { HomeHeaderItemComponent } from './home/home-header/home-header-item/home-header-item.component';
import { IndexComponent } from './home/index/index.component';
import { AboutComponent } from './home/about/about.component';
import { ContactComponent } from './home/contact/contact.component';
import { LoginComponent } from './home/login/login.component';
import { CreateComponent } from './home/create/create.component';
registerLocaleData (localeHungary, 'hu');
registerLocaleData (localeUS, 'en');

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeHeaderComponent,
    HomeHeaderItemComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'hu' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
