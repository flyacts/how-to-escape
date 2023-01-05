/*!
 * @copyright FLYACTS GmbH 2022
 */

import { DeskQsState } from './deskQs.state';
import { GameStateModel } from './game.state';
import { PcQsState } from './pcQs.state';

export interface GlobalStateInterface {
    game: GameStateModel;
    pcQs: PcQsState;
    deskQs: DeskQsState;
}
