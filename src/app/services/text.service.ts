/*!
 * @copyright FLYACTS GmbH 2022
 */

import { Injectable } from '@angular/core';
import { Subject, delay, takeUntil, tap, timer } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class TextService {

    private appContainer!: Element;
    private textContainer: HTMLDivElement;

    private readonly fadeInTime = 500;
    private readonly fadeOutTime = 1500;

    private trigger$ = new Subject<void>();

    public constructor() {
        this.textContainer = document.createElement('div');

        this.textContainer.classList.add('notification-text');
        this.textContainer.style.position = 'absolute';
        this.textContainer.style.transform = 'translateX(-50%)';
        this.textContainer.style.bottom = '50px';
        this.textContainer.style.left = '50%';
        this.textContainer.style.opacity = '0';
        this.textContainer.style.fontFamily = 'Typewriter';
        this.textContainer.style.fontSize = '24px';
        this.textContainer.style.textAlign = 'center';
        this.textContainer.style.width = '40%';
        this.textContainer.style.color = '#BBB';
        this.textContainer.style.padding = '16px 32px';
        this.textContainer.style.background = '#111';
        this.textContainer.style.boxShadow = '0 0 30px 30px #111';
        this.textContainer.style.pointerEvents = 'none';
        this.textContainer.style.userSelect = 'none';
    }

    /**
     * show text
     */
    public showText(
        text: string,
        duration = 5000,
    ): void {
        // prevent multiple notification stacking
        this.trigger$.next();

        this.textContainer.textContent = text;
        this.textContainer.style.transition = `opacity ${this.fadeInTime}ms`;

        this.appContainer = document.querySelector('.app')!;
        this.appContainer.appendChild(this.textContainer);

        timer(1)
            .pipe(
                tap(() => {
                    this.textContainer.style.opacity = '1';
                }),
                delay(duration),
                tap(() => {
                    this.textContainer.style.transition = `opacity ${this.fadeOutTime}ms`;
                    this.textContainer.style.opacity = '0';
                }),
                delay(this.fadeOutTime),
                tap(() => {
                    this.dismissExistingText();
                }),
                // prevent multiple notification stacking
                takeUntil(this.trigger$),
            )
            .subscribe();
    }

    /**
     * do show text, but with a random text out of `texts`
     */
    public showRandomText(texts: string[], duration?: number) {
        const random = Math.floor(Math.random() * texts.length);

        this.showText(texts[random], duration);
    }

    /**
     * dismiss hide existing text if any exist
     */
    private dismissExistingText(): void {
        const existingText = document.querySelector('.notification-text');

        console.log(existingText);

        if (existingText) {
            this.appContainer.removeChild(existingText);
        }
    }
}
