import { Component, OnInit, WritableSignal, effect, signal } from '@angular/core';
import { SceneService } from '../../services/scene.service';
import { Scene } from '../../enum';

@Component({
  selector: 'app-flyman',
  templateUrl: './flyman.component.html',
  styleUrls: ['./flyman.component.scss']
})
export class FlymanComponent implements OnInit {
    public iconSrc: WritableSignal<string> = signal('../../../assets/images/dresden-night.png');

    public constructor(
        private sceneService: SceneService
    ) {}
    
    public ngOnInit(): void {
        const clickAudio = new Audio('../../../assets/audio/click.wav');

        setTimeout(() => {
            this.iconSrc.set('../../../assets/images/dresden-night-sign.png');
            clickAudio.play();

            setTimeout(() => {
                this.sceneService.currentScene.set(Scene.Door);
            }, 2000)
        }, 2000);
    }
}
