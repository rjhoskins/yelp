var mongoose = require("mongoose");


//Schema SETUP

var Comment = new mongoose.Schema({
   created: { type: Date, default: Date.now },
   text: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   }
});

// send out
module.exports = mongoose.model("Comment", Comment);
