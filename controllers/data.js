//GET

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});

let incrementToken = (req, res, token, d) => {
    client.get(token, function(err, token_value){
        if (token_value < 10){
            client.incr(token);
            client.ttl(token, redis.print);
            client.get(token, redis.print);
            res.status(200).json(d);
        }
        else{
            client.del(req.session.token);
            req.session.token = "";
            req.session.logged = false;
            res.status(400).json({error : "Veuillez renseigner un token valide"});
        }
    });
}

function connectToken(req, token){
    const jwt = require('jsonwebtoken')
    try{
        const payload = jwt.verify(token, "My so secret sentence") 
        console.log(payload._id);
        req.session.logged = true;
        return req;

    } catch(error) {
        console.error(error.message)
        req.session.logged = false;
        return req;
    }

}

function readData(req, res) {

    let Data = require("../models/data");
    const token = req.header('Authorization').replace('Bearer ', '');

    if (req.session.logged === false){
        req = connectToken(req, token);
    }

    Data.find({})
    .then((d) => {
        if (req.session.logged === true){
            client.exists(token, function(err, reply){

                if (reply === 0){
                    client.set(token, 0);
                    client.expire(token, 600);
                    res.status(200).json(d);
                }
                else {
                    incrementToken(req, res, token, d);
                }
            });
            
        }
        else{
            res.status(400).json({error : "Veuillez renseigner un token valide"});
        }
    }, (err) => {
        res.status(500).json(err);
    });
 }

 //PUT
 function addData(req, res) {
    let Data = require("../models/data");
    let newData = Data ({});

    newData.save()
    .then((savedData) => {

        //send back the created Pizza
        res.json(savedData);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

module.exports.readData = readData;
module.exports.addData = addData;



