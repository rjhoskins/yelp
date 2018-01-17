// ===================
// COMMENTS ROUTES 
// ===================
var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middle = require("../middleware");



//REST NEW
router.get("/new", middle.isLoggedIn, function (req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function (err, cgdetail) {
      if (err) {
         console.log(err);
      }
      else {
         cgdetail.momoney = "mo money";
         req.flash("sucess", "comment added");
         res.render("comments/new", { cg: cgdetail });
      }
   });
});

//REST CREATE
router.post("/", middle.isLoggedIn, function (req, res) {
   // get a cg
   Campground.findById(req.params.id, function (err, cgdetail) {
      if (err) {
         console.log(err)
         res.redirect("/campgrounds");
      }
      else {
         Comment.create(req.body.comments, function (err, cmnt) {
            if (err) {}
            else {
               cmnt.author.id = req.user._id;
               cmnt.author.username = req.user.username;
               cmnt.save();
               cgdetail.comments.push(cmnt);
               cgdetail.save();
               res.redirect("/campgrounds/" + req.params.id);
            }
         });
      }
   });
});


//REST EDIT
router.get("/:cmnt_id/edit", middle.checkCommentOwnership, function (req, res) {
   //res.send("edit comment route");
   var id = req.params.id;

   Comment.findById(req.params.cmnt_id, function (err, cmnt) {
      if (err) { res.redirect("back"); }
      else {
         res.render("comments/edit", { campground_id: id, comment: cmnt });

      }
   });
});


//REST UPDATE
router.put("/:cmnt_id", middle.checkCommentOwnership, function (req, res) {
   //res.send("put out  route");
   var id = req.params.cmnt_id;
   var updated = req.body.comment;

   Comment.findByIdAndUpdate(id, updated, function (err, updatedDoc) {
      if (err) {
         console.log("error on comment update");
         console.log(id);
         console.log(updated);
         console.log(updatedDoc);
         res.redirect("back");
      }
      else {
         console.log(id);
         console.log(updated);
         console.log(updatedDoc);
         res.redirect("/campgrounds/" + req.params.id);
      }
   });
});


//REST DESTROY
router.delete("/:cmnt_id", middle.checkCommentOwnership, function (req, res) {
   //res.send("put out  route");
   var id = req.params.cmnt_id;
   //res.send("do you *really* want to delete comment ID:" + id + "?");

   console.log("===========");
   console.log("delete route");

   Comment.findByIdAndRemove(id, function (err, doc) {
      if (err) { console.log("not good: " + err); }
      else {
         req.flash("sucess", "comment deleted");
         res.redirect("/campgrounds/" + req.params.id);
      }

   });
});


module.exports = router;
