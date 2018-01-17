//=================
//CAMPGROUND ROUTES
//=================



var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middle = require("../middleware/index");



//INDEX
router.get("/", function (req, res) {
   //console.log("campgrounds get");


   //get all cgs
   Campground.find(function (err, cglist) {
      if (err) {

         console.log(err);
      }
      else { res.render("campgrounds/index", { campgrounds: cglist }); }
   });


});


//NEW
router.get("/new", middle.isLoggedIn, function (req, res) {

   res.render("campgrounds/new");

});


//SHOW
router.get("/:id", function (req, res) {

   //get a campground
   Campground.findById(req.params.id).populate("comments").exec(function (err, cgdetail) {
      if (err) {
         console.log(err);
      }
      else {

         res.render("campgrounds/show", { cgdetail: cgdetail });
      }
   });

});


//CREATE ROUTE 
router.post("/", middle.isLoggedIn, function (req, res) {

   var newCg = new Campground();
   newCg.author.id = req.user._id;
   newCg.author.username = req.user.username;
   newCg.name = req.body.cgName;
   newCg.url = req.body.cgPhoto;
   newCg.description = req.body.cgDescription;
   //console.log(newCg);


   Campground.create(newCg, function (error, campground) {
      if (error) {
         console.log(error);
      }
      else {
         res.redirect("/campgrounds");
      }
   });


});


//EDIT ROUTE
router.get("/:id/edit", middle.checkCampgroundOwnership, function (req, res) {
   //console.log(newCg);

   Campground.findById(req.params.id, function (err, cg) {
      if (err) {
         req.flash("error", "campground does not exist");
         console.log(err);
      }
      else {
         res.render("campgrounds/edit", { campground: cg });

      }
   });


});


//UPDATE ROUTE
router.put("/:id", middle.checkCampgroundOwnership, function (req, res) {

   var id = req.params.id;
   var updated = req.body.campground;

   Campground.findByIdAndUpdate(id, updated, function (err, updatedDoc) {

      if (err) { console.log("not good: " + err); }
      else {
         res.redirect("/campgrounds/" + id);
      }
   });
});


//DESTROY ROUTE
router.delete("/:id", middle.checkCampgroundOwnership, function (req, res) {
   console.log("===========");
   console.log("delete route");
   var id = req.params.id;
   Campground.findByIdAndRemove(id, function (err, doc) {
      if (err) { console.log("not good: " + err); }
      else {
         req.flash("sucess", "campground deleted");
         res.redirect("/campgrounds");
      }

   });
});


module.exports = router;
