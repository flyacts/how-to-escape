/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { HeadsetState } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class HeadsetService {

    public headsetState: WritableSignal<HeadsetState>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.headsetState = signal(
            this.localStorageService.get('HEADSET_STATE') ?? HeadsetState.OnDevDanielDesk,
        );

        effect(() => {
            if (this.headsetState()) {
                this.localStorageService.set(
                    'HEADSET_STATE',
                    this.headsetState(),
                );
            }
        });
    }
}
