/*!
 * @copyright FLYACTS GmbH 2023
 */


import { Injectable, signal, WritableSignal } from '@angular/core';

import { HeadsetState, InventoryItemEnum, LightBulbState } from '../enum';
import { InventoryItemInterface } from '../interfaces/inventory-item.interface';
import { HeadsetService } from './headset.service';
import { LightBulbService } from './light-bulb.service';


@Injectable({
    providedIn: 'root',
})
export class InventoryService {

    public inventory: WritableSignal<InventoryItemInterface[]> = signal([]);

    public constructor(
        private lightBulbService: LightBulbService,
        private headsetService: HeadsetService,
    ) {
        this.initInventory();
    }

    public getInventory(): InventoryItemInterface[] {
        return this.inventory();
    }

    public addItemToInventory(item: InventoryItemInterface): void {
        if (this.inventory().find(i => i.name === item.name)) {
            console.error('item already in Inventory', item);

            return;
        }
        this.inventory().push(item);
    }

    public removeItemFromInventory(item: InventoryItemInterface): void {
        const filteredInventory = this.inventory().filter(i => i.name !== item.name);

        this.inventory.update(() => filteredInventory);
    }

    private initInventory(): void {
        if (this.lightBulbService.lightBulbState() === LightBulbState.InInventory) {
            this.addItemToInventory({
                name: InventoryItemEnum.Lightbulb,
                imageName: 'bulb.png',
            });
        }

        if (this.headsetService.headsetState() === HeadsetState.InInventory) {
            this.addItemToInventory({
                name: InventoryItemEnum.Headset,
                imageName: 'headset.png',
            });
        }
    }

}
