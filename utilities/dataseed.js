var data = require("../utilities/data");
var mongoose = require("mongoose");
var Camp = require("../models/campground");
var Comment = require("../models/comment");
var dt = require('luxon');



function seedDB() {




   clearDB();
   //add some campgrounds with comment
   addCampgrounds(data.campgrounds);
   addCampgrounds(data.campgrounds_2);
   //addCommentToAllCampgrounds();



}


//clear existing data
function clearDB() {

   Comment.remove({}, function (error) {
      if (error) {}
      else {}
   });

   Camp.remove({}, function (error) {
      if (error) {}
      else {}
   });

}

function addCampgrounds(arr, cmnt) {
   arr.forEach(function (cg) {
      Camp.create(cg, function (error, data) {
         if (error) {}
         else {



         }


      });

   });
}






module.exports = seedDB;
