const jwt = require('jsonwebtoken');

function createToken(user) {
    return jwt.sign({id: user.id, username: user.username}, "My so secret sentence");
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

function connectToken(req, res){
    const token = req.header('Authorization').replace('Bearer ', '');
    const jwt = require('jsonwebtoken')
    console.log(token);
    try{
        const payload = jwt.verify(token, "My so secret sentence") 
        console.log(payload._id);
        req.session.logged = true;
        req.session.token = token;

        res.status(200).json();
    } catch(error) {
        console.error(error.message)
        req.session.logged = false;
        res.status(400).json();
    }

}

module.exports.connectUser = connectUser;
module.exports.signUpUser = signUpUser;
module.exports.connectToken = connectToken;



