
import 'package:flutter/rendering.dart';

class Room {
    final String id;
    final String displayName;
    final AssetImage backgroundImage;

    Room? transitionTop;
    Room? transitionBottom;
    Room? transitionLeft;
    Room? transitionRight;

    Room({
        required this.id,
        required this.displayName,
        required this.backgroundImage,
        this.transitionTop,
        this.transitionBottom,
        this.transitionLeft,
        this.transitionRight,
    });

    setLeftTransition(Room room) {
      transitionLeft = room;
    }
}