
import 'dart:collection';

import 'package:how_to_escape_app/game/room/room.dart';

class EscapeGame {

  /// The game rooms.
  final Set<Room> rooms;

  String _currentRoomId;
  int _currentRoomIndex;

  EscapeGame({
    required Set<Room> this.rooms,
  }): assert(rooms.isNotEmpty),
      _currentRoomId = rooms.first.id,
      _currentRoomIndex = 0;

  String get currentRoomId {
    return _currentRoomId;
  }

  goToNextRoom() {
    _currentRoomIndex++;
    if (_currentRoomIndex >= rooms.length) {
      _currentRoomIndex = 0;
    }
    _currentRoomId = rooms.elementAt(_currentRoomIndex).id;
  }

}

