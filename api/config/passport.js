import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User.js";

// Ensure environment variables are loaded
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.warn(
    "Warning: Google OAuth credentials missing in environment variables",
  );
}

if (!process.env.FACEBOOK_APP_ID || !process.env.FACEBOOK_APP_SECRET) {
  console.warn(
    "Warning: Facebook OAuth credentials missing in environment variables",
  );
}

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        proxy: true,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({ "google.id": profile.id });

          if (existingUser) {
            return done(null, existingUser);
          }

          const role = req.session?.oauthRole || "patient";
          const email = profile.emails[0].value;
          const existingEmailUser = await User.findOne({ email });

          if (existingEmailUser) {
            existingEmailUser.google = {
              id: profile.id,
              email: profile.emails[0].value,
            };
            await existingEmailUser.save();
            return done(null, existingEmailUser);
          }

          const newUser = await new User({
            email,
            name: profile.displayName,
            role,
            google: {
              id: profile.id,
              email: profile.emails[0].value,
            },
          }).save();

          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      },
    ),
  );
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
        proxy: true,
        profileFields: ["id", "emails", "name"],
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await User.findOne({
            "facebook.id": profile.id,
          });

          if (existingUser) {
            return done(null, existingUser);
          }

          const role = req.session?.oauthRole || "patient";
          const email = profile.emails[0].value;
          const existingEmailUser = await User.findOne({ email });

          if (existingEmailUser) {
            existingEmailUser.facebook = {
              id: profile.id,
              email: profile.emails[0].value,
            };
            await existingEmailUser.save();
            return done(null, existingEmailUser);
          }

          const newUser = await new User({
            email,
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            role,
            facebook: {
              id: profile.id,
              email: profile.emails[0].value,
            },
          }).save();

          done(null, newUser);
        } catch (error) {
          done(error, null);
        }
      },
    ),
  );
}
