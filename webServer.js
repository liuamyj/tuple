
var express = require('express'); 
var portno = 3000;   // Port number to use
var app = express(); 
// var io = require('socket.io')(http);

app.use(express.static(__dirname));

var cards = [];
var numStartingCards = 12;  

var server = app.listen(portno, function () {
	var port = server.address().port;
	console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

app.get('/newGame', function (request, response) {

	//populate the cards array w/ all 81 cards
	for (var i = 1; i <= 3; i++) {
		for (var j = 1; j <= 3; j++) {
			for (var k = 1; k <= 3; k++) {
				for (var l = 1; l <= 3; l++) {
					var card = [i, j, k, l];  
					cards.push(card); 
				}
			}
		}
	}

	//randomly select first 12 cards 
	var startingBoard = []; 

	for (var m = 0; m < numStartingCards; m++) {
		var rand = Math.floor(Math.random() * cards.length);
		startingBoard.push(cards[rand]); 
		cards.splice(rand, 1); 
	}

  	response.status(200).send(startingBoard);
  	return;
});

// io.on('connection', function(socket){
//   //console.log('a user connected');
//   socket.on('disconnect', function(){
//     //console.log('user disconnected');
//   });
// });

