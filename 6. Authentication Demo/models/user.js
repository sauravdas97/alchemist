var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose")
var userSchema = new mongoose.Schema({
  username: String,
  password: String
});
userSchema.plugin(passportLocalMongoose); // here the package "passport-local-mongoose" will add all the packages top the user schema that we created for authentication
module.exports = mongoose.model("User",userSchema);
