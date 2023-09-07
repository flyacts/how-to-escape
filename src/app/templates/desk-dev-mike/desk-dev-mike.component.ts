import { Component, OnInit, Signal, computed } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Arrow, createArrow, createIcon, createLampIcon } from '../../helpers';
import { Scene } from '../../enum';

@Component({
  selector: 'app-desk-dev-mike',
  templateUrl: './desk-dev-mike.component.html',
  styleUrls: ['./desk-dev-mike.component.scss']
})
export class DeskDevMikeComponent implements OnInit {

    public iconSrc: Signal<string> = computed(() => !this.sceneService.isDevDeskMikeLightOn()
            ? '../../../assets/images/desk_dev2_1.png'
            : '../../../assets/images/desk_dev2_2.png',
    );

    public constructor(
        private sceneService: SceneService,
    ) {  }


    public async ngOnInit(): Promise<void> {
        const leaveDesk = this.createFloorArrow();
        const lampIcon = await createLampIcon(590, 130, this.sceneService.isDevDeskMikeLightOn);

        this.sceneService.pixiApp?.stage.addChild(leaveDesk);
        this.sceneService.pixiApp?.stage.addChild(lampIcon);
    }

    /**
     * create arrow to floorQs
     */
    public createFloorArrow(): Arrow {
        const leaveDesk = createArrow({
            tipX: 1500,
            tipY: 950,
            color: 0x212121,
            direction: 'right',
            size: 100,
            angle: 0,
        });

        leaveDesk.onmouseup = (): void => {
            this.sceneService.currentScene.set(Scene.FloorAc);
        };

        return leaveDesk;
    }

}
