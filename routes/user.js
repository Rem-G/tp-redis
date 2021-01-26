//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/user');

//GET
router.get("/user", (req, res) => {
    controller.user(req, res);
});

module.exports = router;