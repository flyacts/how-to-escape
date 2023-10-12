/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Injectable } from '@angular/core';

import { BooleanEnum, FridgeState, LightBulbState, Scene } from '../enum';

export interface LocalStorageKeys {
    CURRENT_SCENE: Scene;
    FRIDGE_STATE: FridgeState;
    IS_FREEZER_LOCKED: BooleanEnum,
    IS_FRIDGE_LOCKED: BooleanEnum,
    LIGHT_BULB_STATE: LightBulbState,
}

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {

    private readonly PREFIX = 'HOW_TO_ESCAPE';

    /**
     * get the value of a item in local storage
     *
     * @param key key of the item in local storage
     */
    public get<Key extends keyof LocalStorageKeys>(
        key: Key,
    ): LocalStorageKeys[Key] | null {
        const item = localStorage.getItem(this.toKey(key));

        return (item) ? item as LocalStorageKeys[Key] : null;
    }

    /**
     * persist `value` under the `key` in local storage
     *
     * @param key key of the item in local storage
     * @param value value of the item
     */
    public set<Key extends keyof LocalStorageKeys>(
        key: Key,
        value: LocalStorageKeys[Key],
    ): void {
        localStorage.setItem(this.toKey(key), value.toString());
    }

    /**
     * get key of an item
     */
    private toKey(key: string): string {
        return `${this.PREFIX}_${key}`;
    }
}
