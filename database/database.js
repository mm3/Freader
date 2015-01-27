var config = require(__dirname + '/../config.js');
var dbproxy = require('./dbproxy.js');


exports.connect = function(callback) {
	console.log("Connecting to database...");
	dbproxy.connect(config.database);

	db = dbproxy.connection;
	db.on('error', console.error.bind(console, 'Connection error:'));
	db.once('open', function() {
		console.log("Connected !");
		callback();
	});
};

exports.user = require('./userDB.js');
exports.feed = require('./feedDB.js');
