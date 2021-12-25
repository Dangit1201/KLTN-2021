const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt } = require("passport-jwt");
const config = require("config");
const User = require("../models/user");

// Passport Jwt
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: config.get("auth").JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const user = await User.findById(payload.sub);

        if (!user) return done(null, false);

        done(null, user);
        console.log('aaaasasa',payload);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

passport.use(new GoogleStrategy({
  clientID: '284749127522-hse026gfpek5srij24g1jg93tircb91c.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "/auth/google/callback"
},
async (accessToken, refreshToken, profile,cb) => {
  console.log(profile);
  // check whether this current user exists in our database
  console.log( profile);
  const user = await User.findOne({
    authGoogleID: profile.id,
    authType: "google",
  });
  
  // If new account
  const newUser = new User({
    authType: 'google',
    authGoogleID: profile.id,
    email: profile.emails[0].value,
    full_name: profile.displayName,
    isVerified : 'true'
  })

  if (user) {
    if (user.authGoogleID == undefined) {
      user.authGoogleID= profile.id,
      user.email = profile.emails[0].value,
      user.full_name = profile.displayName,
      user.isVerified = 'true'
      await user.save();
    }
     cb(null, newUser)
  } else {
    await newUser.save((err) => {
      if (err) {
        console.log(err);
         throw err;
      }
      cb(null, newUser)
    });
  }
}
));

passport.use(new FacebookStrategy({
  clientID: '290623686453773',
  clientSecret: '46e4fbc50197f9501237b06e51045cef',
  callbackURL: "/auth/facebook/callback",
  profileFields: ["email", "name","displayName"]
},
async (accessToken, refreshToken, profile, cb) => { 
  
    // check whether this current user exists in our database
    console.log( profile);
    const user = await User.findOne({
      authFacebookID: profile.id,
      authType: "facebook",
    });
    
 
    // If new account
    const newUser = new User({
      authType: 'facebook',
      authFacebookID: profile.id,
      email: profile.emails[0].value,
      full_name: profile.displayName,
      isVerified : 'true'
    })
    
    if (user) {
      if (user.authFacebookID == undefined) {
        console.log("a")
        user.authFacebookID= profile.id,
        user.email = profile.emails[0].value,
        user.full_name = profile.displayName,
        user.isVerified = 'true'
        await user.save();
        req.session.email_user = profile.emails[0].value;
      }
      cb(null, newUser)
    } else {
      console.log("b")
      await newUser.save((err) => {
        if (err) {
          console.log(err);
          throw err;
        }
        req.session.email_user = profile.emails[0].value;
        cb(null, newUser)
      });
    }
}
));


/* // Passport local
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) return done(null, false);

        const isCorrectPassword = await user.isValidPassword(password);

        if (!isCorrectPassword) return done(null, false);

        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);  */
