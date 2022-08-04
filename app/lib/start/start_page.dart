import 'dart:collection';

import 'package:flutter/material.dart';
import 'package:how_to_escape_app/game/game.dart';
import 'package:how_to_escape_app/game/room/room.dart';


class StartPage extends StatefulWidget {

    const StartPage({super.key});

    @override
    State<StartPage> createState() => StartPageState();
}

class StartPageState extends State<StartPage> {

    final EscapeGame game = EscapeGame(rooms: HashSet.from([Room(id: 'Raum 1'), Room(id: 'Raum 2')])); 

    @override
    Widget build(BuildContext context) {

        return Scaffold(
            appBar: AppBar(
            title: const Text('How to escape FLYACTS'),
            ),
            body: Container(
            constraints: const BoxConstraints.expand(),
            decoration: const BoxDecoration(
                image: DecorationImage(
                image: AssetImage('./../../assets/images/2017_Kraftwerk.jpg'),
                fit: BoxFit.cover,
                colorFilter: ColorFilter.mode(Colors.red, BlendMode.colorDodge)
            )),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                Text(
                    'Current Room: ${game.currentRoomId}',
                    style: const TextStyle(
                    color: Colors.green,
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
                                content: Text('Going to Room ${game.currentRoomId}'), 
                                duration: Duration(milliseconds: 1000),
                                backgroundColor: Colors.green,
                            )
                        ); 
                    },
                    child: const Text('Go to next Room!'),
                )
                // Text(
                //   '$_counter',
                //   style: Theme.of(context).textTheme.headline4,
                // ),
                ],
            ),
            ),
        );
    }

}
