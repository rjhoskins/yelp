//=================
//MISCELANEOUS ROUTES
//=================

var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var User = require("../models/user");
var passport = require("passport");


//home route
router.get("/", function (req, res) {
   res.render("landing");
});


// ===================
// AUTH ROUTES 
// ===================


router.get("/register", function (req, res) {
   res.render("register");
});


router.post("/register", function (req, res) {

   var newUser = new User({ username: req.body.username })
   User.register(newUser, req.body.password, function (err, newUser) {
      if (err) {
         console.log("Error registering: " + err)
         return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
         res.redirect("/campgrounds");

      });

   });

});


router.get("/login", function (req, res) {
   res.render("login");
});


router.post("/login", passport.authenticate("local", {
   successRedirect: "/campgrounds",
   failureRedirect: "/login",


}), function (req, res) {});


router.get("/logout", function (req, res) {
   req.logout();
   req.flash("success", "Logged you out, bye!");
   res.redirect("/campgrounds");
})


module.exports = router;
