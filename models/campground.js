var mongoose = require("mongoose");



//Schema SETUP

var Camppground = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   name: String,
   url: String,
   description: String,
   comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
   }],
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});


// send out
module.exports = mongoose.model("Campground", Camppground);
