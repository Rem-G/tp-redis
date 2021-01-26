//GET
function readData(req, res) {

    let Data = require("../models/data");

    Data.find({})
    //.populate('pizzas')
    //.populate('client')
    .then((d) => {
        res.status(200).json(d);
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



