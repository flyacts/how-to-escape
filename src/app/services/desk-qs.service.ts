/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { BooleanEnum } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class DeskQsService {

    public hasChangedLightBulb: WritableSignal<boolean>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.hasChangedLightBulb = signal(
            this.localStorageService.get('HAS_CHANGED_LIGHT_BLUB') === BooleanEnum.True,
        );

        effect(() => {
            if (this.hasChangedLightBulb()) {
                this.localStorageService.set(
                    'HAS_CHANGED_LIGHT_BLUB',
                    this.hasChangedLightBulb().toString() as BooleanEnum,
                );
            }
        });
    }
}
