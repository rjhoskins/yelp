// ==========
// MIDDLEWARE 
// ==========


var Campground = require("../models/campground");
var Comment = require("../models/comment");


var middlewarObj = {};

middlewarObj.checkCommentOwnership = function (req, res, next) {

   //req.user._id
   if (req.isAuthenticated()) {
      Comment.findById(req.params.id, function (err, foundCmnt) {
         if (err) {
            res.redirect("back");
         }
         else {
            if (foundCmnt.author.id.equals(req.user._id)) {
               next();
            }
            else {
               res.redirect("back");

            }
         }

      });
   }
   else {
      res.redirect("back");
   }
}

middlewarObj.checkCampgroundOwnership = function (req, res, next) {

   //req.user._id
   if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function (err, foundCg) {
         if (err) {
            req.flash("error", "campground not found");
            res.redirect("back");
         }
         else {
            if (foundCg.author.id.equals(req.user._id)) {
               next();
            }
            else {
               req.flash("error", "You don't have permission to do that");
               res.redirect("back");
            }
         }

      });
   }
   else {
      req.flash("error", "You need to be the author to edit this");
      res.redirect("back");
   }
}


middlewarObj.isLoggedIn = function (req, res, next) {
   if (req.isAuthenticated()) {

      return next();
   }
   req.flash("error", "Please Login First");
   res.redirect("/login");
}

module.exports = middlewarObj;
