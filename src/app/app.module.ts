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
import { PcQsComponent } from './templates/pc-qs/pc-qs.component';
import { StartScreenComponent } from './templates/start-screen/start-screen.component';

@NgModule({
    declarations: [
        AppComponent,
        StartScreenComponent,
        PcQsComponent,
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
