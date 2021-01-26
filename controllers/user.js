const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign({id: user.id, email: user.email}, "My so secret sentence");
}

function connectUser(req, res){
    let User = require("../models/user");

    User.findOne({ email: req.body.email }, function(err, user) {
        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            console.log(isMatch);
            if (isMatch === true){
                res.status(200).json({token: createToken(user)});
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
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname
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

module.exports.connectUser = connectUser;
module.exports.signUpUser = signUpUser;



