/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Graphics, Point } from 'pixi.js';

interface ArrowData {
    tipX: number;
    tipY: number;
    size: number,
    direction: 'top' | 'left' | 'bottom' | 'right',
    color: number;
    angle?: number;
}

class Arrow extends Graphics {
    public data!: ArrowData;
}

/**
 * create arrow
 */
export function createArrow(
    data: ArrowData,
): Arrow {
    const { tipX, tipY, size, color, direction, angle } = data;

    const p2 = (direction === 'right' || direction === 'bottom')
        ? new Point(tipX - 0.5 * size, tipY - 0.5 * size)
        : new Point(tipX + 0.5 * size, tipY + 0.5 * size);

    const p3 = (direction === 'right' || direction === 'top')
        ? new Point(tipX - 0.5 * size, tipY + 0.5 * size)
        : new Point(tipX + 0.5 * size, tipY - 0.5 * size);

    const arrow = new Arrow();
    const path = [tipX, tipY, p2.x, p2.y, p3.x, p3.y];

    arrow.angle = angle ?? 0;
    arrow.lineStyle(5, 0xEEEEEE);
    arrow.beginFill(color);
    arrow.drawPolygon(path);
    arrow.endFill();

    arrow.interactive = true;
    arrow.cursor = 'pointer';

    arrow.data = {
        tipX,
        tipY,
        size,
        color,
        direction,
    };

    return arrow;
}
