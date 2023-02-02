/*!
 * @copyright FLYACTS GmbH 2022
 */

import '@pixi/graphics';

import { Component, ElementRef, ViewChild } from '@angular/core';
import * as PIXI from 'pixi.js';

interface ArrowData {
    tip: { x: number, y: number, },
    size: number,
    direction: 'top' | 'left' | 'bottom' | 'right',
}

class Arrow extends PIXI.Graphics {
    public data!: ArrowData;
}

@Component({
    selector: 'app-canvas-test',
    templateUrl: './canvas-test.component.html',
    styleUrls: ['./canvas-test.component.scss'],
})
export class CanvasTestComponent {
    @ViewChild('canvas', { static: true })
    public canvas!: ElementRef<HTMLCanvasElement>;

    private pixiApp!: PIXI.Application;

    /**
     * setup
     */
    public setup(): void {
        this.pixiApp = new PIXI.Application({
            backgroundAlpha: 0,
            view: this.canvas.nativeElement,
        });

        this.canvas.nativeElement.height = this.canvas.nativeElement.clientHeight;
        this.canvas.nativeElement.width = this.canvas.nativeElement.clientWidth;

        const arrow = this.createArrow({ x: 100, y: 100 }, 50, 'left');
        const hoverArrow = this.createArrow(
            { x: arrow.data.tip.x + 10, y: arrow.data.tip.y + 10 },
            arrow.data.size + 20,
            arrow.data.direction,
        );

        this.pixiApp.stage.addChild(arrow);

        arrow.onmouseenter = (): void => {
            this.pixiApp.stage.addChild(hoverArrow);
        };

        arrow.onmouseleave = (): void => {
            this.pixiApp.stage.removeChild(hoverArrow);
        };
        // arrow.onmouseleave = (): void => {
        //     console.log('leave');
        //     arrow.beginFill(0xFF0000);
        //     arrow.endFill();
        //     this.pixiApp.stage.removeChild(arrow);
        // };
    }

    /**
     * create arrow
     */
    public createArrow(
        tip: { x: number, y: number, },
        size: number,
        direction: 'top' | 'left' | 'bottom' | 'right',
    ): Arrow {
        const p2 = (direction === 'right' || direction === 'bottom')
            ? new PIXI.Point(tip.x - 0.5 * size, tip.y - 0.5 * size)
            : new PIXI.Point(tip.x + 0.5 * size, tip.y + 0.5 * size);

        const p3 = (direction === 'right' || direction === 'top')
            ? new PIXI.Point(tip.x - 0.5 * size, tip.y + 0.5 * size)
            : new PIXI.Point(tip.x + 0.5 * size, tip.y - 0.5 * size);

        const arrow = new Arrow();
        const path = [tip.x, tip.y, p2.x, p2.y, p3.x, p3.y];

        arrow.beginFill(0xFF0000);
        arrow.drawPolygon(path);
        arrow.endFill();

        arrow.interactive = true;
        arrow.cursor = 'pointer';

        arrow.data = {
            tip,
            size,
            direction,
        };

        return arrow;
    }
}
