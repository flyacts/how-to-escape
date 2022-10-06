import 'package:flutter/material.dart';
import 'package:how_to_escape_app/game/game.dart';
import 'package:how_to_escape_app/game/rooms.dart';


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
          )),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
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
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Going to Room ${game.room.displayName}'), 
                      duration: const Duration(milliseconds: 1000),
                      backgroundColor: Colors.green,
                    )
                  ); 
                },
                child: const Text('Go left'),
              ),
              ElevatedButton(
                onPressed: () {
                  setState(() {game.goToRight();});
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Going to Room ${game.room.displayName}'), 
                      duration: const Duration(milliseconds: 1000),
                      backgroundColor: Colors.green,
                    )
                  ); 
                },
                child: const Text('Go right'),
              )
            ],
          ),
        ),
      );
    }

}
