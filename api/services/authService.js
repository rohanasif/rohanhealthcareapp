import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserByAuthProvider = async (provider, providerId) => {
  const query =
    provider === "google"
      ? { googleId: providerId }
      : { facebookId: providerId };
  return await User.findOne(query);
};

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

export const verifyPassword = async (user, password) => {
  return await user.comparePassword(password);
};

export const createSocialUser = async (profile, authType) => {
  const userData = {
    name: profile.displayName,
    email: profile.emails[0].value,
    authType,
    isVerified: true,
    dateOfBirth: new Date(),
    gender: "other",
    phone: "",
    address: "",
    role: "patient", // Default role, should be updated after OAuth
  };

  if (authType === "google") {
    userData.googleId = profile.id;
  } else if (authType === "facebook") {
    userData.facebookId = profile.id;
  }

  return await createUser(userData);
};
