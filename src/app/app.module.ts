/*!
 * @copyright FLYACTS GmbH 2023
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { InventoryComponent } from './molecules/inventory/inventory.component';
import { DialogComponent } from './organisms/dialog/dialog.component';
import { CouchComponent } from './templates/couch/couch.component';
import { DeskDevDanielComponent } from './templates/desk-dev-daniel/desk-dev-daniel.component';
import {
    DeskDevDanielNoHeadphonesComponent,
} from './templates/desk-dev-daniel-no-headphones/desk-dev-daniel-no-headphones.component';
import { DeskDevMikeComponent } from './templates/desk-dev-mike/desk-dev-mike.component';
import { DeskDevToniComponent } from './templates/desk-dev-toni/desk-dev-toni.component';
import { DeskDsSaschaComponent } from './templates/desk-ds-sascha/desk-ds-sascha.component';
import { DeskDsSaschaKeyboardComponent } from './templates/desk-ds-sascha-keyboard/desk-ds-sascha-keyboard.component';
import { DeskQsComponent } from './templates/desk-qs/desk-qs.component';
import { DeskQsKeyboardComponent } from './templates/desk-qs-keyboard/desk-qs-keyboard.component';
import { DoorComponent } from './templates/door/door.component';
import { FloorAcComponent } from './templates/floor-ac/floor-ac.component';
import { FloorQsComponent } from './templates/floor-qs/floor-qs.component';
import { FlymanComponent } from './templates/flyman/flyman.component';
import { FridgeComponent } from './templates/fridge/fridge.component';
import { PcQsComponent } from './templates/pc-qs/pc-qs.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        CouchComponent,
        StartScreenComponent,
        PcQsComponent,
        DeskDevDanielComponent,
        DeskDevDanielNoHeadphonesComponent,
        DeskDevMikeComponent,
        DeskDevToniComponent,
        DeskDsSaschaComponent,
        DeskDsSaschaKeyboardComponent,
        DeskQsComponent,
        DeskQsKeyboardComponent,
        DoorComponent,
        FloorQsComponent,
        FloorAcComponent,
        FlymanComponent,
        FridgeComponent,
        InventoryComponent,
        DialogComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
