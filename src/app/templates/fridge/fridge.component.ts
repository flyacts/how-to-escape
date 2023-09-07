import { Component, Signal, computed, effect } from '@angular/core';
import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import * as PIXI from 'pixi.js';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent {


    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
    ) {
        this.iconSrc = computed(() => {
          if (this.sceneService.fridgeState() === 'open') {
            return '../../../assets/images/fridge_open.png'
          }
          if (this.sceneService.fridgeState() === 'freezer-open') {
            return '../../../assets/images/fridge_open_freezer.png'
          }

          return '../../../assets/images/fridge.png'
        });

        effect(() => {
            // redraw to update icons for fridge state
            if (this.sceneService.fridgeState()) {
                this.sceneService.clear();
                this.draw();
            }
        });
    }

    public async ngOnInit(): Promise<void> {
        this.draw();
    }

    /**
     * create arrow to AC Floor
     */
    public createFloorArrow(): Arrow {
        const toDoor = createArrow({
            tipX: 800,
            tipY: 1050,
            color: 0x212121,
            direction: 'bottom',
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
    private async draw() {
        const toFloor = this.createFloorArrow();

        this.sceneService.pixiApp?.stage.addChild(toFloor);

        const fridgeIcon = this.sceneService.fridgeState() === 'closed'
            ? await this.createFridgeOpenIcon()
            : await this.createFridgeCloseIcon();
    
        this.sceneService.pixiApp?.stage.addChild(fridgeIcon);

        if (this.sceneService.fridgeState() !== 'closed') {
            const freezerIcon = this.sceneService.fridgeState() === 'open'
                ? await this.createFreezerOpenIcon()
                : await this.createFreezerCloseIcon();

            this.sceneService.pixiApp?.stage.addChild(freezerIcon);
        }
    }

    /**
     * create icon to open fridge
     */
    private async createFridgeOpenIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/interact.svg', 680, 480, 64, 64);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.fridgeState.set('open');
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

    /**
     * create icon to close fridge
     */
    private async createFridgeCloseIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/interact.svg', 1350, 600, 64, 64);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.fridgeState.set('closed');
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

    /**
     * create icon to open fridge freezer compartment
     */
    private async createFreezerOpenIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/interact.svg', 680, 380, 64, 64);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.fridgeState.set('freezer-open');
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

    /**
     * create icon to close fridge freezer compartment
     */
    private async createFreezerCloseIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/interact.svg', 1030, 450, 64, 64);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.sceneService.fridgeState.set('open');
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