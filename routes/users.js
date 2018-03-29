var express = require('express');
var User = require("../controller/users");
var router = express.Router();

router.post("/register",User.register);

router.post("/login",User.login);

router.get("/all",User.getAllUsers);

module.exports = router;
