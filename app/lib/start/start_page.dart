import 'package:flutter/material.dart';

class StartPage extends StatelessWidget {
  const StartPage({Key? key}) : super(key: key);

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
            const Text(
              'My eyes are buring !',
              style: TextStyle(
                color: Colors.green,
                fontSize: 24,
                fontWeight: FontWeight.bold,
                fontStyle: FontStyle.italic,
              ),
            ),
            ElevatedButton(
              onPressed: () {ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                            content: Text('It Works!'), 
                            duration: Duration(milliseconds: 5000),
                            backgroundColor: Colors.green,
                        )
                    ); 
                },
              child: const Text('GO!'),
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
