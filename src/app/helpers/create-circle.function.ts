/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Graphics } from 'pixi.js';

interface CircleData {
    x: number;
    y: number;
    size: number,
    color: number;
}

export class InteractionCircle extends Graphics {
    public data!: CircleData;
}

/**
 * create arrow
 */
export function createCircle(
    data: CircleData,
): InteractionCircle {
    const { x, y, size, color } = data;
    const circle = new InteractionCircle();

    circle.lineStyle(5, 0xEEEEEE);
    circle.beginFill(color);
    circle.drawCircle(x, y, size);
    circle.endFill();

    circle.interactive = true;
    circle.cursor = 'pointer';

    circle.data = {
        x,
        y,
        size,
        color,
    };

    return circle;
}
