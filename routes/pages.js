const express = require("express");
const loggedIn = require('../controllers/loggedIn');
const logout = require('../controllers/logout')
const router = express.Router();

router.get("/", loggedIn, (req, res) => {
    if(req.user) {
        res.render("index", { status: "loggedIn", user:req.user });
    } else {
        res.render("index", { status: "no", user: "nothing" });
    }
});
router.get("/profile", loggedIn, (req, res) => {
    if(req.user) {
        res.render("profile", { status: "loggedIn", user:req.user });
    } else {
        res.render("profile", { status: "no", user: "nothing" });
    }
})
router.get("/register", (req, res) => {
    console.log("running reg.html")
    res.sendFile("register.html", {root: "./public/"});
});
router.get("/login", (req, res) => {
    console.log("running log.html")
    res.sendFile("login.html", {root: "./public/"});
});
router.get("/logout", logout);


module.exports = router;