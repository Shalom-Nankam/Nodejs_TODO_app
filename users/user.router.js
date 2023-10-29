const express = require("express");
const controller = require("./user.controller");
const middlewre = require("./user.middlewre");

const router = express.Router();

router.post("/login", middlewre.ValidateLogin, controller.Login);
router.post("/signup", middlewre.ValidateUserCreation, controller.CreateUser);

module.exports = router;
