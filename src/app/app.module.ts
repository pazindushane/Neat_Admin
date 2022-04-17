import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DialogsComponent } from './core/dialogs/dialogs.component';
import { NotFoundPageComponent } from './core/not-found-page/not-found-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { CookieModule } from 'ngx-cookie';
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HighlightDirective} from "./services/highlight.directive";
import {AutoFocusDirective} from "./services/auto-focus.directive";
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    DialogsComponent,
    NotFoundPageComponent,
    HighlightDirective,
    AutoFocusDirective,
  ],
  exports: [
    HighlightDirective,
    AutoFocusDirective,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatButtonModule,
        HttpClientModule,
        CookieModule.forRoot(),
        MatTooltipModule,
        MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
