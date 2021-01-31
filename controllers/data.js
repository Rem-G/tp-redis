//**********************
//Méthodes sans passport
//**********************

// const redis = require("redis");
// const client = redis.createClient();

// client.on("error", function(error) {
//   console.error(error);
// });

// const incrementToken = (req, res, token, d) => {
//     client.get(token, function(err, token_value){
//         if (token_value < 10){
//             client.incr(token);
//             client.ttl(token, redis.print);
//             client.get(token, redis.print);
//             res.status(200).json(d);
//         }
//         else{
//             req.session.logged = false;
//             res.status(400).json({error : "Vous avez utilisé votre quota de requêtes, veuillez attendre 10min avant de réessayer"});
//         }
//     });
// }

// function connectToken(req, token){
//     const jwt = require('jsonwebtoken')
//     try{
//         const payload = jwt.verify(token, "My so secret sentence");
//         req.session.logged = true;
//         req.session.token = token;

//     } catch(error) {
//         console.error(error.message);
//         req.session.logged = false;
//     }

//     return req;
// }

// function readData(req, res) {
//     let Data = require("../models/data");
//     const token = req.header('Authorization').replace('Bearer ', '');

//     if (req.session.logged !== true || req.session.token !== token){
//         req = connectToken(req, token);
//     }

//     if (req.session.logged === true){
//         Data.find({})
//         .then((d) => {
//                 client.exists(token, function(err, reply){

//                     if (reply === 0){
//                         client.set(token, 1);
//                         client.expire(token, 600);
//                         client.ttl(token, redis.print);
//                         client.get(token, redis.print);
//                         res.status(200).json(d);
//                     }
//                     else {
//                         incrementToken(req, res, token, d);
//                     }
//                 });
//         }, (err) => {
//             res.status(500).json(err);
//         });
//     }
//     else{
//         res.status(400).json({error : "Veuillez renseigner un token valide"});
//     }
//  }

function readData(req, res) {
    let Data = require("../models/data");
    Data.find({})
        .then((d) => {
            res.json(d);
        }, (err) => {
            res.status(400).json(err);
        });
 }


function addData(req, res) {
    let Data = require("../models/data");
    let newData = Data ({});

    newData.save()
    .then((savedData) => {

        res.json(savedData);
            
    }, (err) => {
        res.status(400).json(err)
    });
}

module.exports.readData = readData;
module.exports.addData = addData;



