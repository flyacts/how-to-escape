/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { BooleanEnum } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class FlymanService {

    public isSignOn: WritableSignal<BooleanEnum>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.isSignOn = signal(
            this.localStorageService.get('FLYMAN_SIGN_ON') ?? BooleanEnum.False,
        );

        effect(() => {
            if (this.isSignOn()) {
                this.localStorageService.set(
                    'FLYMAN_SIGN_ON',
                    this.isSignOn(),
                );
            }
        });
    }
}
