/*!
 * @copyright FLYACTS GmbH 2022
 */

import * as PIXI from 'pixi.js';

/**
 * create lamp icon
 */
export async function createIcon(
    iconPath: string,
    x: number,
    y: number,
    width?: number,
    height?: number,
): Promise<PIXI.Sprite> {
    const texture = await PIXI.Texture.fromURL(iconPath);
    const sprite = PIXI.Sprite.from(texture, { width, height });

    sprite.interactive = true;
    sprite.cursor = 'pointer';
    sprite.position.x = x;
    sprite.position.y = y;
    sprite.width = width ?? sprite.getBounds().width;
    sprite.height = height ?? sprite.getBounds().height;

    return sprite;
}
