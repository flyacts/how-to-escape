/*!
 * @copyright FLYACTS GmbH 2022
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        StartScreenComponent,
    ],
    imports: [
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
