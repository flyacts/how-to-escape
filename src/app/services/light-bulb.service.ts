/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { LightBulbState } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class LightBulbService {

    public lightBulbState: WritableSignal<LightBulbState>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.lightBulbState = signal(
            this.localStorageService.get('LIGHT_BULB_STATE') ?? LightBulbState.InDevMikesLamp,
        );

        effect(() => {
            if (this.lightBulbState()) {
                this.localStorageService.set(
                    'LIGHT_BULB_STATE',
                    this.lightBulbState(),
                );
            }
        });
    }
}
