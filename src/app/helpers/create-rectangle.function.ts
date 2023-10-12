/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Graphics } from 'pixi.js';

interface RectangleData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: number;
    angle?: number;
    alpha?: number;
}

export class Rectangle extends Graphics {
    public data!: RectangleData;
}

/**
 * create arrow
 */
export function createRectangle(
    data: RectangleData,
): Rectangle {
    const { x, y, width, height, color, angle, alpha } = data;
    const rectangle = new Rectangle();

    rectangle.lineStyle(5, 0xEEEEEE);
    rectangle.beginFill(color);
    rectangle.angle = angle ?? 0;
    rectangle.drawRect(x, y, width, height);
    rectangle.endFill();

    rectangle.alpha = alpha ?? 1;
    rectangle.interactive = true;
    rectangle.cursor = 'pointer';

    rectangle.data = data;

    return rectangle;
}
