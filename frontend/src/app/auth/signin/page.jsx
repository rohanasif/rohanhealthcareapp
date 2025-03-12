"use client";
import { useState, useEffect } from "react";
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
  Alert,
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

export default function SignIn() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, isAuthenticated } = useAuth();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, user } = await authService.login(email, password);
      await login(user, token);
      const callbackUrl = searchParams.get("callbackUrl") || "/";
      router.push(callbackUrl);
    } catch (err) {
      setError(err.message || "Failed to sign in");
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
      sx={{ p: 4 }}
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
        Please sign in to continue.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2, width: "100%", maxWidth: 400 }}>
          {error}
        </Alert>
      )}

      {/* Role Selection */}
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(e, newRole) => newRole && setRole(newRole)}
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
          onClick={handleGoogleLogin}
          disabled={loading}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
        >
          Continue with Google
        </Button>
        <Button
          fullWidth
          variant="outlined"
          startIcon={<Facebook />}
          onClick={handleFacebookLogin}
          disabled={loading}
          sx={{
            color: "text.primary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
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
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          Don't have an account?{" "}
          <Typography
            component="a"
            href="/auth/register"
            variant="body2"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Register here
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
}
