/*!
 * @copyright FLYACTS GmbH 2023
 */


import { Injectable } from '@angular/core';

import { InventoryItemInterface } from '../interfaces/inventory-item.interface';


@Injectable({
    providedIn: 'root',
})
export class InventoryService {

    private inventory: InventoryItemInterface[];

    public constructor() {
        this.inventory = [];
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
