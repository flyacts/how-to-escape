import 'dart:collection' show HashSet;

import 'package:flutter/material.dart';
import 'package:how_to_escape_app/game/game.dart';
import 'package:how_to_escape_app/game/room/room.dart';


class StartPage extends StatefulWidget {

    const StartPage({super.key});

    @override
    State<StartPage> createState() => StartPageState();
}

class StartPageState extends State<StartPage> {

    final EscapeGame game = EscapeGame(rooms: HashSet.from([
      Room(
        id: 'qs-desk',
        displayName: 'QS Desk',
        backgroundImage: const AssetImage('./../../assets/images/desk_qs.jpg')
      ),
      Room(
        id: 'sm-desk',
        displayName: 'Scrum Master Desk',
        backgroundImage: const AssetImage('./../../assets/images/desk_sm.jpg')
      )
    ])); 

    @override
    Widget build(BuildContext context) {

        return Scaffold(
            appBar: AppBar(
            title: const Text('How to escape FLYACTS'),
            ),
            body: Container(
            constraints: const BoxConstraints.expand(),
            decoration: BoxDecoration(
                image: DecorationImage(
                image: game.currentRoom.backgroundImage,
                fit: BoxFit.cover,
                // colorFilter: const ColorFilter.mode(Color.fromARGB(137, 27, 27, 29), BlendMode.overlay)
            )),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Text(
                    'Current Room: ${game.currentRoom.displayName}',
                    style: const TextStyle(
                      color: Color.fromARGB(255, 219, 225, 219),
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      fontStyle: FontStyle.italic,
                    ),
                  ),
                  ElevatedButton(
                    onPressed: () {
                      setState(() {game.goToNextRoom();});
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(
                          content: Text('Going to Room ${game.currentRoom.displayName}'), 
                          duration: const Duration(milliseconds: 1000),
                          backgroundColor: Colors.green,
                        )
                      ); 
                    },
                    child: const Text('Go to next Room!'),
                )
              ],
            ),
            ),
        );
    }

}
