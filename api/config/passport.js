import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../api/models/User.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // If user doesn't exist, create new user
        // Note: Role selection should be handled in the frontend before initiating OAuth
        user = new User({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          authType: "google",
          isVerified: true,
          // These fields will need to be collected after OAuth
          dateOfBirth: new Date(),
          gender: "other",
          phone: "",
          address: "",
          role: "patient", // Default role, should be updated after OAuth
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "email"],
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        let user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        // If user doesn't exist, create new user
        user = new User({
          facebookId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          authType: "facebook",
          isVerified: true,
          // These fields will need to be collected after OAuth
          dateOfBirth: new Date(),
          gender: "other",
          phone: "",
          address: "",
          role: "patient", // Default role, should be updated after OAuth
        });

        await user.save();
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    },
  ),
);

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
