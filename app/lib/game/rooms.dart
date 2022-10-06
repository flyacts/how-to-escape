import 'package:flutter/material.dart' show AssetImage;
import 'package:how_to_escape_app/game/room/room.dart';

final smDesk = Room(
  id: 'sm-desk',
  displayName: 'Scrum Master Desk',
  backgroundImage: const AssetImage('./../../assets/images/desk_sm.jpg'),
);

final qsDesk = Room(
  id: 'qs-desk',
  displayName: 'QS Desk',
  backgroundImage: const AssetImage('./../../assets/images/desk_qs.jpg'),
);

void initRooms() {
  qsDesk.transitionLeft = smDesk;
  smDesk.transitionRight = qsDesk;
}
