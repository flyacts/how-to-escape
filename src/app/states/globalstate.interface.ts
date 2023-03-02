/*!
 * @copyright FLYACTS GmbH 2022
 */

import { DeskQsState } from './deskQs.state';
import { FloorAcState } from './floorAc.state';
import { FloorQsState } from './floorQs.state';
import { GameStateModel } from './game.state';
import { PcQsState } from './pcQs.state';

export interface GlobalStateInterface {
    game: GameStateModel;
    pcQs: PcQsState;
    deskQs: DeskQsState;
    floorQs: FloorQsState;
    floorAc: FloorAcState;
}
