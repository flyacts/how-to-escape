
import 'package:how_to_escape_app/game/room/room.dart';

class EscapeGame {

  /// The game rooms.
  final Set<Room> rooms;

  String _currentRoomId;
  int _currentRoomIndex;

  EscapeGame({
    required this.rooms,
  }): assert(rooms.isNotEmpty),
      _currentRoomId = rooms.first.id,
      _currentRoomIndex = 0;

  String get currentRoomId {
    return _currentRoomId;
  }

  Room get currentRoom {
    return rooms.firstWhere((element) => element.id == currentRoomId);
  }

  goToNextRoom() {
    _currentRoomIndex++;
    if (_currentRoomIndex >= rooms.length) {
      _currentRoomIndex = 0;
    }
    _currentRoomId = rooms.elementAt(_currentRoomIndex).id;
  }

}

