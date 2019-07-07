// ================== EXPRESS ==================
var express = require("express");
var app = express();
// =============================================



// ================== MONGOOSE ==================
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/auth");
var User = require("./models/user.js");
// ==============================================



// ================== PASSPORT ==================
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
app.use(require("express-session")({              
  secret: "Hello this is express session",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate())); 
passport.serializeUser(User.serializeUser());        
passport.deserializeUser(User.deserializeUser());
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
app.get("/secret", isLoggedIn, function(req,res){
  res.render("secret.ejs")
});
// ==================================================================



// ================= USER SIGNUP =================
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
app.post("/login", passport.authenticate("local", {
  successRedirect:"/secret",
  failureRedirect:"/login"
}),function(req,res){
});
// ========================================================



// ================== LOGOUT ==================
app.get("/logout",function(req,res){
  req.logout();
  res.redirect("/")
})
// ============================================


// ==================================== MIDDLEWARE ====================================

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login")
}
// ====================================================================================

app.listen(3000,function(){
  console.log("server started at port 3000");
})
