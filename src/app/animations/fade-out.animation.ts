/*!
 * @copyright FLYACTS GmbH 2023
 */

import { animate, AnimationTransitionMetadata, style, transition } from '@angular/animations';

/**
 * an animation used for fading out elements
 */
export const fadeOutAnimation: AnimationTransitionMetadata = transition(
    ':leave',
    [
        style({ opacity: 1 }),
        animate(
            '0.3s ease-out',
            style({ opacity: 0 }),
        ),
    ],
);
