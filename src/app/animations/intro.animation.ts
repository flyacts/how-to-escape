/*!
 * @copyright FLYACTS GmbH 2023
 */

import { animate, AnimationTransitionMetadata, style, transition } from '@angular/animations';

/**
 * an animation used for fading in elements
 */
export const introAnimation: AnimationTransitionMetadata = transition(
    ':enter',
    [
        style({ opacity: 0 }),
        animate(
            '4s 6s ease-out',
            style({ opacity: 1 }),
        ),
    ],
);
