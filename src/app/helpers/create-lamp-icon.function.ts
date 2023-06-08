import * as PIXI from 'pixi.js';
import { WritableSignal } from "@angular/core";

import { createIcon } from "./create-icon.function";


/**
 * create lamp icon
 */
export async function createLampIcon(x: number, y:  number, signal: WritableSignal<boolean>): Promise<PIXI.Sprite> {
    const sprite = await createIcon('../../../assets/icons/lamp.svg', x, y);

    // be initially invisible
    sprite.alpha = 0;

    // toggle on click
    sprite.onmouseup = (): void => {
        signal.set(!signal());
    };

    // be visible on hover
    sprite.onmouseover = (): void => {
        sprite.alpha = 1;

        // be invisible again on leave
        sprite.onmouseleave = (): void => {
            sprite.alpha = 0;
        };
    };

    return sprite;
}