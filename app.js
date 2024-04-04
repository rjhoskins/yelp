var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");

var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var strategy = require("passport-local-mongoose");
var methodOverride = require("method-override")
var expressSanitizer = require('express-sanitizer');
var flash = require("connect-flash");

//spin up the local db in dockerfile for local dev (see directions in file)

const LOCAL_MONGO = "mongodb://localhost:27017/yelp_camp"

var URI_STRING = (process.env.URI_STRING) ? process.env.URI_STRING : LOCAL_MONGO ;
var PORT = (process.env.PORT) ? process.env.PORT : "3000";
console.log(URI_STRING);

mongoose.connect(URI_STRING, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

//Schema imports
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
var seedDB = require("./utilities/dataseed");
var clearDB = require("./utilities/dataseed");
var commentsRoutes = require("./routes/comments");
var campgroundsRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");



app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer()); // this line follows bodyParser() instantiations
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB();
// clearDB()



//===============
//PASSPORT CONFIG
//===============
app.use(require("express-session")({
   secret: 'use abacadaba',
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.set("view engine", "ejs");
app.use(function (req, res, next) {
   res.locals.currentUser = req.user
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use(indexRoutes);
app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);



app.listen(PORT, function () {
   console.log(`To infinity and beyond ==> on port ${PORT}`);
});
