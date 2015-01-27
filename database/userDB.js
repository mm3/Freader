var dbproxy = require('./dbproxy.js');

var userSchema = dbproxy.db.Schema({
	email: String,
	password: String,
	_feeds: [{type: dbproxy.db.Schema.Types.ObjectId, ref: 'Feed'}],
	creationDate: { type: Date, default: Date.now }
});

var User = dbproxy.db.model('User', userSchema);
exports.model = User;

exports.create = function(email, password, callback) {
	User.find().where("email").equals(email).exec(function (err, user) {
		if (user.length || err)
			return callback(null, true);
		var newUser = new User({email: email, password: password});
		newUser.save(function (err) {
			return callback(this, err);
		});
	});
}

exports.delete = function(user, callback) {
	User.remove({email: user.email}, callback);
}

exports.login = function(email, password, callback) {
	User.findOne().where("email").equals(email).exec(function (err, user) {
		if (!user || password != user.password)
			return callback(false);
		return callback(user);
	});
}
