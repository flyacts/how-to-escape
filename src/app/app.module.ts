/*!
 * @copyright FLYACTS GmbH 2022
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DeskDevDanielComponent } from './templates/desk-dev-daniel/desk-dev-daniel.component';
import { DeskQsComponent } from './templates/desk-qs/desk-qs.component';
import { DeskQsKeyboardComponent } from './templates/desk-qs-keyboard/desk-qs-keyboard.component';
import { FloorAcComponent } from './templates/floor-ac/floor-ac.component';
import { FloorQsComponent } from './templates/floor-qs/floor-qs.component';
import { PcQsComponent } from './templates/pc-qs/pc-qs.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeskDevDanielHeadphonesComponent } from './templates/desk-dev-daniel-headphones/desk-dev-daniel-headphones.component';
import { DoorComponent } from './templates/door/door.component';
import { DeskDevMikeComponent } from './templates/desk-dev-mike/desk-dev-mike.component';
import { CouchComponent } from './templates/couch/couch.component';
import { FlymanComponent } from './templates/flyman/flyman.component';
import { DeskDevToniComponent } from './templates/desk-dev-toni/desk-dev-toni.component';
import { DeskDsSaschaComponent } from './templates/desk-ds-sascha/desk-ds-sascha.component';
import { FridgeComponent } from './templates/fridge/fridge.component';
import { InventoryComponent } from './molecules/inventory/inventory.component';

@NgModule({
    declarations: [
        AppComponent,
        CouchComponent,
        StartScreenComponent,
        PcQsComponent,
        DeskDevDanielComponent,
        DeskDevDanielHeadphonesComponent,
        DeskDevMikeComponent,
        DeskDevToniComponent,
        DeskDsSaschaComponent,
        DeskQsComponent,
        DeskQsKeyboardComponent,
        DoorComponent,
        FloorQsComponent,
        FloorAcComponent,
        FlymanComponent,
        FridgeComponent,
        InventoryComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
