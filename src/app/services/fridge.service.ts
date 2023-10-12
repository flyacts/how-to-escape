/*!
 * @copyright FLYACTS GmbH 2023
 */

import { effect, Injectable, signal, WritableSignal } from '@angular/core';

import { BooleanEnum, FridgeState } from '../enum';
import { LocalStorageService } from './local-storage.service';


@Injectable({
    providedIn: 'root',
})
export class FridgeService {

    public isFridgeLocked: WritableSignal<boolean>;
    public isFreezerLocked: WritableSignal<boolean>;
    public fridgeState: WritableSignal<FridgeState>;

    public constructor(
        private localStorageService: LocalStorageService,
    ) {
        this.isFridgeLocked = signal(
            this.localStorageService.get('IS_FRIDGE_LOCKED') === BooleanEnum.True
            || this.localStorageService.get('IS_FRIDGE_LOCKED') === null,
        );

        effect(() => {
            this.localStorageService.set('IS_FRIDGE_LOCKED', this.isFridgeLocked().toString() as BooleanEnum);
        });

        this.isFreezerLocked = signal(
            this.localStorageService.get('IS_FREEZER_LOCKED') === BooleanEnum.True
            || this.localStorageService.get('IS_FREEZER_LOCKED') === null,
        );

        effect(() => {
            this.localStorageService.set('IS_FREEZER_LOCKED', this.isFreezerLocked().toString() as BooleanEnum);
        });

        this.fridgeState = signal(
            this.localStorageService.get('FRIDGE_STATE') ?? FridgeState.Closed,
        );

        effect(() => {
            this.localStorageService.set('FRIDGE_STATE', this.fridgeState());
        });
    }
}
