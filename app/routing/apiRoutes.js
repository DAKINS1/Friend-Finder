
// Import the list of friend entries
var friends = require('../data/friends.js');

// Export API route function
module.exports = function(app, path) {

    // getting friends list in a json format
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    // Add new friend entry
    app.post('/api/friends', function(req, res) {
        // get user input from body and place in variable
        var userInput = req.body;
        // get user scores and place in variable
        var userResponses = userInput.scores;

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 100;

        // Loop through friends array
        for (var i = 0; i < friends.length; i++) {

            // Compute differences for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
            //calculate difference between user & friend answers
                diff += Math.abs(friends[i].scores[j] - userResponses[j]);
            }

            // Whichever difference is the lowest is the match
            if (diff < totalDifference) {

                totalDifference = diff;
                matchName = friends[i].name;
                matchImage = friends[i].photo;
            }
        }

        // push userInput into friendArray
        friends.push(userInput);

        // send match in json format
        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
    });
};