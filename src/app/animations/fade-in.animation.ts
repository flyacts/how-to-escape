/*!
 * @copyright FLYACTS GmbH 2023
 */

import { animate, AnimationTransitionMetadata, style, transition } from '@angular/animations';

/**
 * an animation used for fading in elements
 */
export const fadeInAnimation: AnimationTransitionMetadata = transition(
    ':enter',
    [
        style({ opacity: 0 }),
        animate(
            '0.3s ease-out',
            style({ opacity: 1 }),
        ),
    ],
);
