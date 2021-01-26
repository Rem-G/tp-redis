//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/data');

//GET
router.get("/readData", (req, res) => {
    controller.readData(req, res);
});

//POST
router.post("/addData", (req, res) => {
    controller.addData(req, res);
});

module.exports = router;