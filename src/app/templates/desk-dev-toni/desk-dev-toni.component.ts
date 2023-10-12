/*!
 * @copyright FLYACTS GmbH 2023
 */

import { Component, computed, effect, Signal } from '@angular/core';
import * as PIXI from 'pixi.js';

import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';

@Component({
    selector: 'app-desk-dev-toni',
    templateUrl: './desk-dev-toni.component.html',
    styleUrls: ['./desk-dev-toni.component.scss'],
})
export class DeskDevToniComponent {

    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = computed(() => !this.sceneService.isDevDeskToniBoxOpen()
            ? '../../../assets/images/desk_dev1_1.png'
            : '../../../assets/images/desk_dev1_2.png',
        );

        effect(async () => {
            console.log('redraw');
            // redraw to clear search icon for box
            if (this.sceneService.isDevDeskToniBoxOpen()) {
                this.sceneService.clear();

                await this.draw();
            }
        });
    }

    public async ngOnInit(): Promise<void> {
        await this.draw();
    }

    /**
     * create arrow to Desk DS
     */
    public createDeskDSArrow(): Arrow {
        const toDoor = createArrow({
            tipX: 50,
            tipY: 950,
            color: 0x212121,
            direction: 'left',
            size: 100,
            angle: 0,
        });

        toDoor.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDsSascha);
        };

        return toDoor;
    }

    /**
     * create arrow to AC Floor
     */
    public createFloorArrow(): Arrow {
        const toDoor = createArrow({
            tipX: 1550,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        toDoor.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return toDoor;
    }

    /**
     * draw scene contents
     */
    private async draw(): Promise<void> {
        const toDoor = this.createFloorArrow();
        const toDeskDsSascha = this.createDeskDSArrow();

        this.sceneService.pixiApp?.stage.addChild(toDoor);
        this.sceneService.pixiApp?.stage.addChild(toDeskDsSascha);

        if (!this.sceneService.isDevDeskToniBoxOpen()) {
            const boxIcon = await this.createBoxIcon();

            this.sceneService.pixiApp?.stage.addChild(boxIcon);
        }
    }

    /**
     * create box icon to interact with box
     */
    private async createBoxIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/search.svg', 680, 460);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.isDevDeskToniBoxOpen.set(!this.sceneService.isDevDeskToniBoxOpen());
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

}
