import { Component, Signal, computed, signal } from '@angular/core';
import { Scene } from '../../enum';
import { Arrow, createArrow, createIcon } from '../../helpers';
import { SceneService } from '../../services/scene.service';
import * as PIXI from 'pixi.js';
import { TextService } from 'src/app/services/text.service';

@Component({
  selector: 'app-desk-ds-sascha',
  templateUrl: './desk-ds-sascha.component.html',
  styleUrls: ['./desk-ds-sascha.component.scss']
})
export class DeskDsSaschaComponent {

    public iconSrc: Signal<string>;

    public constructor(
        private sceneService: SceneService,
        private textService: TextService,
    ) {
        this.iconSrc = signal('../../../assets/images/desk_ds_1.png');
    }

    public async ngOnInit(): Promise<void> {
        const toDeskDevToni = this.createDeskDevToniArrow();

        this.sceneService.pixiApp?.stage.addChild(toDeskDevToni);
        
        const stormTrooperIcon = await this.createStormTrooperIcon();

        this.sceneService.pixiApp?.stage.addChild(stormTrooperIcon);
    }

    /**
     * create arrow to Desk Dev Toni
     */
    public createDeskDevToniArrow(): Arrow {
        const toDeskToni = createArrow({
            tipX: 1550,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        toDeskToni.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.DeskDevToni);
        };

        return toDeskToni;
    }

    /**
     * create stormtrooper icon
     */
    private async createStormTrooperIcon(): Promise<PIXI.Sprite> {
        const sprite = await createIcon('../../../assets/icons/search.svg', 860, 540);

        // be initially invisible
        sprite.alpha = 0;

        // toggle on click
        sprite.onmouseup = (): void => {
            this.textService.showText('');
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
