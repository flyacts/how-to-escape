/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component } from '@angular/core';


interface InventoryItemInterface {
    name: string,
    imageName: string,
}

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {

    public isOpen = false;

    public inventory: InventoryItemInterface[] = [
        {
            name: 'Bananenschale',
            imageName: 'banana.png',
        },
        {
            name: 'Mate',
            imageName: 'mate.png',
        },
        {
            name: 'Ananas',
            imageName: 'pineapple.webp',
        },
    ];

    public useInventoryItem(item: InventoryItemInterface): void {
        console.log(item.name);
    }
}
