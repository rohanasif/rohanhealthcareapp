import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";

const router = express.Router();

// Validation middleware for registration
const registerValidation = [
  check("name").notEmpty().trim().withMessage("Name is required"),
  check("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  check("dateOfBirth")
    .isISO8601()
    .withMessage("Valid date of birth is required"),
  check("gender")
    .isIn(["male", "female", "other"])
    .withMessage("Valid gender is required"),
  check("phone").notEmpty().withMessage("Phone number is required"),
  check("address").notEmpty().withMessage("Address is required"),
  check("role")
    .isIn(["patient", "doctor", "clinic"])
    .withMessage("Valid role is required"),
];

// Basic Registration
router.post("/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, dateOfBirth, gender, phone, address, role } =
      req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      dateOfBirth,
      gender,
      phone,
      address,
      role,
      authType: "basic",
    });

    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Basic Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({
      email,
      $or: [
        { authType: "basic" },
        { authType: { $exists: false } }, // For existing users without authType
      ],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Ensure user has authType set
    if (!user.authType) {
      user.authType = "basic";
      await user.save();
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Google OAuth Routes
router.get("/google", (req, res, next) => {
  const { role, callbackUrl } = req.query;
  req.session = req.session || {};
  req.session.oauthRole = role;
  req.session.callbackUrl = callbackUrl;

  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })(req, res, next);
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/signin?error=Google%20authentication%20failed",
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    const callbackUrl = req.session?.callbackUrl || "";
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${token}${
        callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""
      }`,
    );
  },
);

// Facebook OAuth Routes
router.get("/facebook", (req, res, next) => {
  const { role, callbackUrl } = req.query;
  req.session = req.session || {};
  req.session.oauthRole = role;
  req.session.callbackUrl = callbackUrl;

  passport.authenticate("facebook", {
    scope: ["email"],
    prompt: "select_account",
  })(req, res, next);
});

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/auth/signin?error=Facebook%20authentication%20failed",
  }),
  (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );

    const callbackUrl = req.session?.callbackUrl || "";
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${token}${
        callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""
      }`,
    );
  },
);

// Verify token endpoint for OAuth callbacks
router.post("/verify-token", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
});

export default router;
