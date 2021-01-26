function connectUser(req, res){
    let User = require("../models/user");

    User.findOne({ email: req.body.email }, function(err, user) {
        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            console.log(isMatch);
            if (isMatch === true){
                res.status(200).json();
            }
            else {
                res.status(400).json();
            }
        });
    });
}

function signUpUser(req, res){
    let User = require("../models/user");

    var testUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    testUser.save(function(err) {
        if (err) {
            res.status(500).json();
        }
        else{
            res.status(200).json();
        }
    });
}



function user(req, res) {

    let User = require("../models/user");

    var testUser = new User({
        username: 'jmar777',
        password: 'Password123'
    });

    // save user to database
    testUser.save(function(err) {
        if (err) throw err;

        // fetch user and test password verification
        User.findOne({ email: 'jmar777' }, function(err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword('Password123', function(err, isMatch) {
                if (err) throw err;
                console.log('Password123:', isMatch); // -> Password123: true
            });

            // test a failing password
            user.comparePassword('123Password', function(err, isMatch) {
                if (err) throw err;
                console.log('123Password:', isMatch); // -> 123Password: false
            });
        });
    });
}

module.exports.user = user;
module.exports.connectUser = connectUser;
module.exports.signUpUser = signUpUser;


