// When running the app, provide the usernames you wish to check as additional args

const https = require('https');

// Print error messages
function printError(error){
	console.error(error.message);
}

// Print message to console
function printMessage(username, badgeCount, points){
	const message = username + " has " + badgeCount + " total badges and " + points + " points in Javascript";
	console.log(message);
}

function getProfile(username){
	try {
		// Connect to the API URL
		const request = https.get('https://teamtreehouse.com/' + username + '.json', function(response){
			//console.log('Status code: ', response.statusCode);
			if (response.statusCode == 200){
				var body = '';
				// Read the data
				response.on('data', function(data){
					body += data.toString();
				});

				response.on('end', function(){
					try {
						// Parse the json data
						const profile = JSON.parse(body);
						//console.dir(profile);
						//console.log(profile.points.total);		
						// Print the data
						printMessage(username, profile.badges.length, profile.points.JavaScript);
					} catch (error){
						printError(error);
					}
				});
			} else {
				console.error('Error: ' + response.statusCode);
			}
		});

		request.on('error', printError);
	} catch (error){
		printError(error);
	}
}

//const users = ['gregwienecke', 'chalkers', 'alenaholligan', 'davemcfarland'];
const users = process.argv.slice(2);

users.forEach(function(user){
	getProfile(user);
});
	
