
import 'package:how_to_escape_app/game/room/room.dart';

class EscapeGame {

  /// The game rooms.
  Room room;

  EscapeGame({
    required this.room,
  });

  isTopTraversible() {
    return (room.transitionTop is Room);
  }

  isBottomTraversible() {
    return (room.transitionBottom is Room);
  }

  isLeftTraversible() {
    return (room.transitionLeft is Room);
  }

  isRightTraversible() {
    return (room.transitionRight is Room);
  }

  goToTop() {
    if (isTopTraversible()) {
      room = room.transitionTop as Room;
    }
  }

  goToBottom() {
    if (isBottomTraversible()) {
      room = room.transitionBottom as Room;
    }
  }
  goToLeft() {
    if (isLeftTraversible()) {
      room = room.transitionLeft as Room;
    }
  }
  goToRight() {
    if (isRightTraversible()) {
      room = room.transitionRight as Room;
    }
  }

}

