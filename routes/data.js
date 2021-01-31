//Access the router on Express 
const router = require('express').Router();
const passport = require('passport');

//Access the controllers
const controller = require('../controllers/data');

//GET
router.get("/readData", passport.authenticate('jwt', { session: false }), (req, res) => {
    controller.readData(req, res);
});

//POST
router.post("/addData", (req, res) => {
    controller.addData(req, res);
});

module.exports = router;