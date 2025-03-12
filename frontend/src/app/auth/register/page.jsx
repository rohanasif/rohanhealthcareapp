"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  InputAdornment,
  IconButton,
  MenuItem,
  Alert,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

export default function Register() {
  const [role, setRole] = useState("patient");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userData = {
        ...formData,
        role,
      };
      const { token, user } = await authService.register(userData);
      await login(user, token);
      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
      router.push(callbackUrl);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    const callbackUrl = searchParams.get("callbackUrl");
    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/google?role=${role}${
      callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""
    }`;
    window.location.href = redirectUrl;
  };

  const handleFacebookLogin = () => {
    const callbackUrl = searchParams.get("callbackUrl");
    const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/facebook?role=${role}${
      callbackUrl ? `&callbackUrl=${encodeURIComponent(callbackUrl)}` : ""
    }`;
    window.location.href = redirectUrl;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      padding="4px"
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline", mb: 1 }}>
        <Typography variant="h4" component="span">
          Welcome Back To,
        </Typography>
        <Typography
          variant="h4"
          component="span"
          sx={{ color: "primary.main" }}
        >
          Health Direct
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Welcome back! Please enter your details.
      </Typography>

      {/* Role Selection */}
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(e, newRole) => setRole(newRole)}
        sx={{
          backgroundColor: "primary.main",
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
        }}
      >
        {["Patient", "Doctor", "Clinic"].map((item) => (
          <ToggleButton
            key={item}
            value={item.toLowerCase()}
            sx={{
              color:
                role === item.toLowerCase() ? "common.white" : "text.primary",
              backgroundColor:
                role === item.toLowerCase() ? "primary.main" : "common.white",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "common.white",
              },
              width: "100px",
              "&.Mui-selected": {
                color: "common.white",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                  color: "common.white",
                },
              },
            }}
          >
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {/* Social Login Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Facebook />}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
          onClick={handleFacebookLogin}
        >
          Continue with Facebook
        </Button>
      </Box>

      <Typography color="text.secondary" sx={{ my: 2 }}>
        or
      </Typography>

      {/* Form Fields */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />

        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <CalendarTodayIcon color="primary" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Gender"
          name="gender"
          select
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          required
          disabled={loading}
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

        <TextField
          label="Phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          disabled={loading}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            mt: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          {loading ? "Registering..." : "Register"}
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Already have an account?{" "}
          <Typography
            component="a"
            href="/auth/signin"
            variant="body2"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Sign in here
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
