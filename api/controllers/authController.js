import { validationResult } from "express-validator";
import * as authService from "../services/authService.js";
import {
  successResponse,
  errorResponse,
  createAuthResponse,
} from "../utils/responseHandler.js";
import catchAsync from "../utils/catchAsync.js";

export const register = catchAsync(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, 400, errors.array());
  }

  const { email } = req.body;

  // Check if user exists
  const existingUser = await authService.findUserByEmail(email);
  if (existingUser) {
    return errorResponse(res, 400, "User already exists");
  }

  // Create new user
  const userData = { ...req.body, authType: "basic" };
  const user = await authService.createUser(userData);

  // Generate JWT
  const token = authService.generateToken(user._id, user.role);

  return successResponse(res, 201, createAuthResponse(user, token));
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await authService.findUserByEmail(email);
  if (!user || user.authType !== "basic") {
    return errorResponse(res, 400, "Invalid credentials");
  }

  // Verify password
  const isMatch = await authService.verifyPassword(user, password);
  if (!isMatch) {
    return errorResponse(res, 400, "Invalid credentials");
  }

  // Generate JWT
  const token = authService.generateToken(user._id, user.role);

  return successResponse(res, 200, createAuthResponse(user, token));
});

export const handleSocialAuthSuccess = (req, res) => {
  const token = authService.generateToken(req.user._id, req.user.role);
  res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}`);
};
