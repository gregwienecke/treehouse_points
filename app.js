//Makes a get request to the treehouse API and returns the badge count and points for desired user(s)

const https = require('https');

// Print message to console
function printMessage(username, badgeCount, points){
	const message = username + " has " + badgeCount + " total badges and " + points + " points in Javascript";
	console.log(message);
}


//printMessage("Greg", 33, 3303);
function getProfile(username){
	// Connect to the API URL (https://teamtreehouse.com/username.json)
	https.get('https://teamtreehouse.com/' + username + '.json', function(response){
		console.log('Status code: ', response.statusCode);

		var body = '';
		
		// Read the data
		response.on('data', function(data){
			body += data.toString();
		});

		response.on('end', function(){
			// Parse the json data
			const profile = JSON.parse(body);
			//console.dir(profile);
			// Print the data
			printMessage(username, profile.badges.length, profile.points.JavaScript);
		});
		
	});
}



//const users = ['gregwienecke', 'chalkers', 'alenaholligan', 'davemcfarland'];
const users = process.argv.slice(2);

users.forEach(function(user){
	getProfile(user);
});
	
