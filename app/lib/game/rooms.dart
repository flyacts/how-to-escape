import 'package:flutter/material.dart' show AssetImage;
import 'package:how_to_escape_app/game/room/room.dart';

final qsDesk = Room(
  id: 'qs-desk',
  displayName: 'QS Desk',
  backgroundImage: const AssetImage('./../../assets/images/desk_qs.jpg'),
);

final smDesk = Room(
  id: 'sm-desk',
  displayName: 'Scrum Master Desk',
  backgroundImage: const AssetImage('./../../assets/images/desk_sm.jpg'),
);

final designerDesk = Room(
  id: 'designer-desk',
  displayName: 'Designer Desk',
  backgroundImage: const AssetImage('./../../assets/images/desk_designer.jpg'),
);

final exitOffice = Room(
  id: 'exit-office',
  displayName: 'Office Exit',
  backgroundImage: const AssetImage('./../../assets/images/exit_office.jpg'),
);

final hallway = Room(
  id: 'hallway',
  displayName: 'Hallway',
  backgroundImage: const AssetImage('./../../assets/images/hallway.jpg'),
);

final kitchen = Room(
  id: 'kitchen',
  displayName: 'Kitchen',
  backgroundImage: const AssetImage('./../../assets/images/kitchen.jpg'),
);

final exitHallway = Room(
  id: 'exit-hallway',
  displayName: 'Hallway Exit',
  backgroundImage: const AssetImage('./../../assets/images/exit_hallway.jpg'),
);

void initRooms() {
  qsDesk.transitionLeft = smDesk;
  smDesk.transitionRight = qsDesk;
  smDesk.transitionTop = exitOffice;
  exitOffice.transitionTop = hallway;
  exitOffice.transitionRight = designerDesk;
  exitOffice.transitionBottom = smDesk;
  designerDesk.transitionRight = exitOffice;
  hallway.transitionLeft = kitchen;
  hallway.transitionTop = exitHallway;
  hallway.transitionBottom = exitOffice;
  exitHallway.transitionBottom = hallway;
  kitchen.transitionRight = hallway;
}
