export const successResponse = (res, statusCode, data) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

export const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export const createAuthResponse = (user, token) => ({
  token,
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
