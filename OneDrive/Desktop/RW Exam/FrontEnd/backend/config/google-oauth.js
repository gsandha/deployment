// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import passport from "passport";
// import dotenv from "dotenv";

// dotenv.config();
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     //   return cb(err, user);
//     // });
//     //console.log(profile)

//     // return cb(null,"user")
//   }
// ));
// // module.exports=passport;
// export {passport}