import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRouteModule } from './app-routes.module'
import {AppShopComponent} from './shop/shop.component'
import {AppAboutComponent} from './about/about.component'
import {AppContactComponent} from './contact-us/contact-us.component'
import {AppArtComponent} from './art/art.component'
import {AppHomeComponent} from './home/home.component'
import {AppNewsComponent} from './news/news.component'

import {Globals} from './globals.service'

@NgModule({
  declarations: [
    AppComponent,
    AppShopComponent,
    AppArtComponent,
    AppAboutComponent,
    AppContactComponent,
    AppHomeComponent,
    AppNewsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'twin-moon-art'
    }),
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    AppRouteModule,
    BrowserAnimationsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
