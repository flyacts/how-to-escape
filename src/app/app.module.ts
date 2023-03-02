/*!
 * @copyright FLYACTS GmbH 2022
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsEmitPluginModule } from '@ngxs-labs/emitter';

import { AppComponent } from './app.component';
import { GameState } from './states/game.state';
import { CanvasTestComponent } from './templates/canvas-test/canvas-test.component';
import { DeskQsComponent } from './templates/desk-qs/desk-qs.component';
import { FloorAcComponent } from './templates/floor-ac/floor-ac.component';
import { FloorQsComponent } from './templates/floor-qs/floor-qs.component';
import { PcQsComponent } from './templates/pc-qs/pc-qs.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        CanvasTestComponent,
        StartScreenComponent,
        PcQsComponent,
        DeskQsComponent,
        FloorQsComponent,
        FloorAcComponent,
    ],
    imports: [
        BrowserModule,
        NgxsModule.forRoot([
            GameState,
        ]),
        NgxsEmitPluginModule.forRoot(),
        NgxsStoragePluginModule.forRoot({
            key: ['game'],
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }
