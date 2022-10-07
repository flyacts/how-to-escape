import 'package:flutter/material.dart';

class TransitionMarker extends StatelessWidget {

  const TransitionMarker({ required this.onPressed, super.key });

  final VoidCallback onPressed;

  @override
  Widget build(BuildContext context) {
    return Material(
      color: const Color.fromARGB(0, 0, 0, 0),
      shape: const CircleBorder(),
      // borderRadius: const BorderRadius.all(Radius.circular(10)),
      child: Center(
        child: Ink(
          decoration: const ShapeDecoration(
            shape: CircleBorder(),
            color: Color.fromARGB(172, 153, 168, 181),
          ),
          child: IconButton(
            onPressed: onPressed,
            icon: const Icon(
              Icons.search,
              color: Colors.white,
            ),
            iconSize: 64,
            tooltip: 'Search this location',
            // hoverColor: const Color.fromARGB(255, 0, 0, 0),
          )
        )
      )
    );
  }
}
