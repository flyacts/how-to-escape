/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { InventoryService } from '../../services/inventory.service';
import { KeyboardService } from '../../services/keyboard.service';


interface InventoryItemInterface {
    name: string,
    imageName: string,
}

@Component({
    selector: 'app-inventory',
    templateUrl: './inventory.component.html',
    styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent implements OnInit {

    public isOpen = false;

    public inventory = this.inventoryService.inventory;

    public constructor(
        private inventoryService: InventoryService,
        private destroyRef: DestroyRef,
        private keyboardService: KeyboardService,
    ) {}

    /**
     * on init
     */
    public ngOnInit(): void {
        this.initKeyboardListener();
    }

    public useInventoryItem(item: InventoryItemInterface): void {
        console.log(item.name);
    }

    /**
     * init listener that opened the inventor on "e" press
     */
    public initKeyboardListener(): void {
        this.keyboardService.keyPressed$
            .pipe(
                filter(event => event.key === this.keyboardService.inventoryKeyPress()),
                takeUntilDestroyed(this.destroyRef),
            )
            .subscribe({
                next: () => {
                    this.isOpen = !this.isOpen;
                },
            });
    }
}
