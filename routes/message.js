var response = {};
var incomingMessage = '';
var posesCollectionName = 'poses';
var actorsCollectionName = 'actors';
var mongodb = require('mongodb');
var client = new mongodb.Db('hk_com', new mongodb.Server(process.env.OPENSHIFT_MONGODB_DB_HOST || "127.0.0.1", process.env.OPENSHIFT_MONGODB_DB_PORT || 27017, {}), {w: 1});

var mongoGetPosesByLetters = function( letters, callback ) {
	var letters = letters;
	var process = function() {
		client.open(function(err, p_client){
			var posesCollection = new mongodb.Collection(client, posesCollectionName );
			posesCollection.find( { letter: {$in: letters} } ).toArray( new HandleResponse( function(results) {
				var map = getByLetter(results);
				results = [];
				for (var i = 0; i < letters.length; i++) {
					results.push(map[letters[i]]);
				}
				callback(results);
			} ) );
		});
	}

	login(process);
}

var mongoInsertActorPoses = function( poses ) {
	var actorsCollection = new mongodb.Collection( client, actorsCollectionName );
		actorsCollection.insert( {messageText: incomingMessage, actorPoses: poses}, new HandleResponse( sendResponse ) );
}

var mongoGetActorPosesById = function( messageId, callback ) {
	var proccess = function() {
		client.open(function(err, client) {
			var actorsCollection = new mongodb.Collection( client, actorsCollectionName );
			actorsCollection.findOne( {_id: messageId }, new HandleResponse( callback ) );
		}); 
	}
	login(process);
}

var login = function(callback) {
	client.authenticate("admin", "Eb_fa3qdsRsv", function(err, res) {
		callback();
	});
	// if ( process.env.OPENSHIFT_NOSQL_DB_USERNAME ) {
	// } else {
	// 	callback();
	// }
}

var HandleResponse = function( callback ) {
	var callback = callback;
	return function( err, results ) {
		if ( err ) {
			console.log( err );
			client.close();
		} else {
			callback( results );
		}
	}
}

var convertToLetters = function( message ) {
	return message.replace( ' ', '' ).toUpperCase().split('');
}

var getByLetter = function( data ) {
	var results = {};
	for (var i = 0; i < data.length; i++) {
		results[data[i].letter] = data[i].pose;
	};
	return results;
}

var sendResponse = function( data ) {
	client.close();
	data = data instanceof Array ? data.pop() : data;
	data.status = 'success';
	if ( data._id ) {
		data.id = data._id;
		delete data._id;
	}
	response.send(JSON.stringify(data));
}

var sendErrorResponse = function( message ) {
	client.close();
	response.send( JSON.stringify({ status: 'unsuccess', message: message }) );
}

exports.proccessCreate = function( req, res ) {
	response = res;
	if ( req.method == 'POST' && req.body.text ) {
		incomingMessage = req.body.text;
		var letters = convertToLetters( incomingMessage );
		mongoGetPosesByLetters( letters, mongoInsertActorPoses );
	} else {
		console.log('on route "message" is not send text data');
	}
}

exports.proccessGet = function( req, res ) {
	response = res;
	if ( req.messageId ) {
		mongoGetActorPosesById( messageId, function( results ) {
			if( results == null ) {
				var error = "No results on messageId: " + req.messageId;
				console.log( error );
				sendErrorResponse( error );
			} else {
				sendResponse( results );
			}
		} );
	} else {
		var error = "Message is not send";
		console.log( error );
		sendErrorResponse( error );
	}
}

