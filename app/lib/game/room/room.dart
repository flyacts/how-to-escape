
import 'package:flutter/rendering.dart';

class Room {
    final String id;
    final String displayName;
    final AssetImage backgroundImage;

    Room({
        required this.id,
        required this.displayName,
        required this.backgroundImage,
    });
}