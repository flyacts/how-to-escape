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
): Promise<PIXI.Sprite> {
    const texture = await PIXI.Texture.fromURL(iconPath);
    const sprite = PIXI.Sprite.from(texture);

    sprite.interactive = true;
    sprite.cursor = 'pointer';
    sprite.position.x = x;
    sprite.position.y = y;

    return sprite;
}