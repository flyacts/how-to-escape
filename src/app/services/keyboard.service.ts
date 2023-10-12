/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Injectable, signal } from '@angular/core';
import { fromEvent, map, Subject } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class KeyboardService {

    public keyPressed$ = new Subject<KeyboardEvent>();

    // indicates if/how the inventory can be opened/closed via key press
    public inventoryKeyPress = signal<'e' | null>('e');

    /**
     * init keydown listener
     */
    public init(): void {
        fromEvent(document, 'keydown')
            .pipe(
                map(event => event as KeyboardEvent),
            )
            .subscribe({
                next: event => {
                    this.keyPressed$.next(event as KeyboardEvent);
                },
            });
    }
}
