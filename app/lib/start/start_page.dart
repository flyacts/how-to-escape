import 'dart:html';

import 'package:flutter/material.dart';
import 'package:how_to_escape_app/game/game.dart';
import 'package:how_to_escape_app/game/rooms.dart';

import '../game/transitions/transition_marker.dart';


class StartPage extends StatefulWidget {

    const StartPage({super.key});

    @override
    State<StartPage> createState() => StartPageState();

}


class StartPageState extends State<StartPage> {
    final EscapeGame game = EscapeGame(room: qsDesk); 

    @override
    Widget build(BuildContext context) {
      initRooms();
      return Scaffold(
          appBar: AppBar(
          title: const Text('How to escape FLYACTS'),
          ),
          body: Container(
            constraints: const BoxConstraints.expand(),
            decoration: BoxDecoration(
              image: DecorationImage(
                image: game.room.backgroundImage,
                fit: BoxFit.cover,
                // colorFilter: const ColorFilter.mode(Color.fromARGB(137, 27, 27, 29), BlendMode.overlay)
              )
            ),
            child: Stack(
              children: <Widget>[
                Positioned(
                  top: 300,
                  left: 500,
                  child: TransitionMarker(onPressed: () => { debugPrint('marker hit')})
                ),
                /*
                Text(
                  'Current Room: ${game.room.displayName}',
                  style: const TextStyle(
                    color: Color.fromARGB(255, 219, 225, 219),
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    fontStyle: FontStyle.italic,
                  ),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {game.goToLeft();});
                  },
                  child: const Text('Go left'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {game.goToRight();});
                  },
                  child: const Text('Go right'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {game.goToTop();});
                  },
                  child: const Text('Go forwards'),
                ),
                ElevatedButton(
                  onPressed: () {
                    setState(() {game.goToBottom();});
                  },
                  child: const Text('Go backwards'),
                )
                */
              ],
          ),
        ),
      );
    }

}
