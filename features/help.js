var
	async = require('async'),
	db = require('../lib/db'),
	phrases = require('../lib/phrases'),
	gw2 = require('../lib/gw2')
;

function messageReceived(message) {
	if (! message.content.match(/^!(help)$/)) return;
	async.waterfall([
		function(next) { message.channel.startTyping(next); },
	], function(err, result) {
		message.channel.stopTyping(function() {
			if (err) {
			    console.log(err.message);
				return;
			}
			if (! result) {
				console.log('Not Registered');
				return;
			}
			message.reply("**Welcome to the help section**" +"\n"+
			              " ``` Setup ``` " +"\n"+
			              phrases.get("LINK")+"\n"+
			              " ``` Character Commands ```" +"\n"+
			              phrases.get("WVW_RANK")+"\n"+
			              phrases.get("FRACTAL_LEVEL")+"\n"+
			              phrases.get("BUILDS")+"\n"+
			              " ``` WvW Commands ``` " +"\n"+
			              phrases.get("WVW_SCORE")+"\n"+
			              phrases.get("REL_SCORE")+"\n"+
			              phrases.get("KILL_DEATH")+"\n");
		});
	});
}

module.exports = function(bot) {
	bot.on("message", messageReceived);
}
