// ================== EXPRESS ==================
var express = require("express");
var app = express();
// =============================================



// ================== MONGOOSE ==================
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth");
var User = require("./models/user.js"); // for the username and password model for sign up
// ==============================================



// ================== PASSPORT ==================
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
app.use(require("express-session")({               // IDEA: here we require the express session package and then use it with the given parameters
  secret: "Hello this is express session",        // this secret will be used to and decode sessions
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize()); // IDEA: these two lines of app.use will set passport up and tell express to use the passport package
app.use(passport.session());

passport.use(new localStrategy(User.authenticate())); // here the User.authenticate() is coming from the user scheman defined it the user mongoose(i.e. "user.ejs" file in models)
// IDEA: these are used to encode and decode the data from the session
passport.serializeUser(User.serializeUser());        // this will encode the data from the user
passport.deserializeUser(User.deserializeUser());   // this will decode the data from the user
// ==============================================



// ================== BODY-PARSER ==================
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended:true}))
// =================================================





// ---------------------- ROUTES ----------------------

// ===========================  SHOW SIGNUP FORM ===========================
app.get("/register",function(req,res){
  res.render("signup.ejs")
});
// =========================================================================



// ===========================  HOME PAGE ===========================
app.get("/",function(req,res){
  res.render("home.ejs")
});
// ==================================================================



// ===========================  SECRET PAGE ===========================
// here we use a middleware that we have created
// when a get request comes to /secret it will run the isLoggedIn function
// isLoggedIn function will check if the user is authenticated and then the call back function will be executed (i.e. this function(req,res) which is after isLoggedIn) and it will render the secret page
// in the isLoggedIn function next() is used and it means that if the user passes authentication (i.e if the password is correct) then it will run the next function i.e. => function(req,res{res.render("secret.ejs")})
app.get("/secret", isLoggedIn, function(req,res){
  res.render("secret.ejs")
});
// ==================================================================



// ================= USER SIGNUP =================
// IDEA: in the function User.register()
// username is passed as first argument to register() => new User({username:req.body.username})
// then password as the second argument is passed to register() => req.body.password
// register() will take it as a new username and then hash the password and thn will save it to database thus then we us the callback function
app.post("/register",function(req,res){
  User.register(new User({username:req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.render("signup.ejs")
    }else{
      passport.authenticate("local")(req,res,function(){    // authenticate() will help us to login to the page. it will do all encoding and decoding by hashing of its own
        // local is used for the logging in by giving password and username we can also use facebook login or gmain login instead of local
        res.redirect("/secret");
      });
    }
  });
});
// ===============================================



// ======================== LOGIN FORM ========================
app.get("/login",function(req,res){
  res.render("login.ejs")
});
// ============================================================


// ==================== lOGIN POST REQ ====================
// here we are using a middleware i.e. passport.authenticate() as an argument in this post request
// a middleware will check the credentials, here passport.authenticate() will automatically take the username and password from the form(i.e. we dont need to provide it explicitely)
// then it will check from the database and if the credentials matches then it will redirect to the page
// it is called as a middleware cause it sits at the middle as an argument and checks the credentials,
// so the middleware come in between of something i.e. first it checks the password and then it helps to redirect to the pasge
app.post("/login", passport.authenticate("local", {
  successRedirect:"/secret",
  failureRedirect:"/login"
}),function(req,res){
});
// ========================================================



// ================== LOGOUT ==================
app.get("/logout",function(req,res){
  req.logout(); // here passport is logging us out by deleting all data from the current session
  res.redirect("/")
})
// ============================================


// ==================================== MIDDLEWARE ====================================
// IDEA: this function will check that if user is logged in or not and we will use this function as a middleware to the "secret" route
// all middleware takes the same arguments as (req,res,next)
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){   //  isAuthenticated() is a function that comes with passport which is a boolean value and returns true or false on the basis of that if the user is logged in or not
    return next();
  }
  res.redirect("/login")
}
// ====================================================================================

app.listen(3000,function(){
  console.log("server started at port 3000");
})
