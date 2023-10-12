/*!
 * @copyright FLYACTS GmbH 2023
 */


import { effect, Injectable } from '@angular/core';

import { LightBulbState } from '../enum';
import { InventoryItemEnum } from '../enum/inventory-items.enum';
import { InventoryItemInterface } from '../interfaces/inventory-item.interface';
import { LightBulbService } from './light-bulb.service';


@Injectable({
    providedIn: 'root',
})
export class InventoryService {

    private inventory: InventoryItemInterface[];

    public constructor(
        private lighbulbService: LightBulbService,
    ) {
        this.inventory = [];


        effect(() => {
            const item: InventoryItemInterface = {
                name: InventoryItemEnum.Lightbulb,
                imageName: 'banana.png',
            };

            if (this.lighbulbService.lightBulbState() === LightBulbState.InInventory) {
                this.addItemToInventory(item);
            } else {
                this.removeItemFromInventory(item);
            }
        });

    }

    public getInventory(): InventoryItemInterface[] {
        return this.inventory;
    }

    public addItemToInventory(item: InventoryItemInterface): void {
        if (this.inventory.find(i => i.name === item.name)) {
            console.error('item already in Inventory', item);

            return;
        }
        this.inventory.push(item);

    }

    public removeItemFromInventory(item: InventoryItemInterface): void {
        this.inventory = this.inventory.filter(i => i.name !== item.name);
    }

}
