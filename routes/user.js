//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const controller = require('../controllers/user');

//GET
router.get("/user", (req, res) => {
    controller.user(req, res);
});

router.post("/connectUser", (req, res) => {
    controller.connectUser(req, res);
});

router.post("/signUpUser", (req, res) => {
    controller.signUpUser(req, res);
});

router.post("/connectToken", (req, res) => {
    controller.connectToken(req, res);
});

module.exports = router;