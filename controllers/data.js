//GET

const redis = require("redis");
const client = redis.createClient();

client.on("error", function(error) {
  console.error(error);
});


function readData(req, res) {

    let Data = require("../models/data");

    Data.find({})
    //.populate('pizzas')
    //.populate('client')
    .then((d) => {
        if (req.session.logged === true){
            client.exists(req.session.token, function(err, reply){

                if (reply === 0){
                    client.set(req.session.token, 0);
                }
                else {
                    client.get(req.session.token, function(err, token_value){
                        if (token_value < 10){
                            client.incr(req.session.token);
                            client.get(req.session.token, redis.print);
                        }
                        else{
                            req.session.token = "";
                            req.session.logged = false;
                        }
                    })
                }
            });
            
            res.status(200).json(d);
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
    let newData = Data ({
        name: req.body.name,
    });

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



