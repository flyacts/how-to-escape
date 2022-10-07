
import 'package:flutter/rendering.dart';

class Room {
    final String id;
    final String displayName;
    final AssetImage backgroundImage;

    Room? transitionTop;
    Room? transitionBottom;
    Room? transitionLeft;
    Room? transitionRight;

    Set<Transition>? transitions;

    Room({
        required this.id,
        required this.displayName,
        required this.backgroundImage,
        this.transitionTop,
        this.transitionBottom,
        this.transitionLeft,
        this.transitionRight,
        this.transitions,
    });


}

class Transition {
  // final Room room;
  final int x;
  final int y;

  Transition({
    // required this.room,
    required this.x,
    required this.y,
  });

}