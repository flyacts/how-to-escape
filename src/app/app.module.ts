/*!
 * @copyright FLYACTS GmbH 2022
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasTestComponent } from './templates/canvas-test/canvas-test.component';
import { DeskDev3Component } from './templates/desk-dev-3/desk-dev-3.component';
import { DeskQsComponent } from './templates/desk-qs/desk-qs.component';
import { DeskQsKeyboardComponent } from './templates/desk-qs-keyboard/desk-qs-keyboard.component';
import { FloorAcComponent } from './templates/floor-ac/floor-ac.component';
import { FloorQsComponent } from './templates/floor-qs/floor-qs.component';
import { PcQsComponent } from './templates/pc-qs/pc-qs.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        CanvasTestComponent,
        StartScreenComponent,
        PcQsComponent,
        DeskQsComponent,
        DeskDev3Component,
        DeskQsKeyboardComponent,
        FloorQsComponent,
        FloorAcComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
