// import dotenv from "dotenv";

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// dotenv.config();

// load up the user model
// let User = require('../models/user');

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = "mern-secret";

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    console.log("Payload:", opts);

    // User.findOne({id: jwt_payload.id}, function(err, user) {
    //       if (err) {
    //           return done(err, false);
    //       }
    //       if (user) {
    //           done(null, user);
    //       } else {
    //           done(null, false);
    //       }
    //   });

    return done(null, {});
  }));


};