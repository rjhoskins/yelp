var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

//Schema SETUP

var userSchema = new mongoose.Schema({
   //created: { type: Date, default: Date.now },
   username: String,
   password: String
});


//middleware
userSchema.plugin(passportLocalMongoose);

//methods


module.exports = mongoose.model("User", userSchema);






/*
var blogSchema = new Schema({
   created: { type: Date, default: Date.now },
   title: String,
   author: String,
   body: String,
   comments: [{ body: String, date: Date }],
   date: { type: Date, default: Date.now },
   hidden: Boolean,
   meta: {
      votes: Number,
      favs: Number
   }
});
*/
