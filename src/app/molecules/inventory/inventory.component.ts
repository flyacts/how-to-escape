/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Component, OnInit } from '@angular/core';

import { Scene } from '../../enum';
import { Arrow, createArrow, createCircle, InteractionCircle } from '../../helpers';
import { SceneService } from '../../services/scene.service';

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
        }
    ]

    public constructor(

    ) { }


    public useInventoryItem(item: InventoryItemInterface) {
        console.log(item.name);
    }

}
