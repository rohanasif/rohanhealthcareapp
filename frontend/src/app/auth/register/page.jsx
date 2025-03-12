"use client";
import { useState } from "react";
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
} from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function Register() {
  const [role, setRole] = useState("patient");

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
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Email" type="email" variant="outlined" fullWidth />

        <TextField
          label="Date of Birth"
          variant="outlined"
          fullWidth
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
          select
          fullWidth
          defaultValue=""
          variant="outlined"
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>

        <TextField label="Phone" type="tel" variant="outlined" fullWidth />
        <TextField label="Address" variant="outlined" fullWidth />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            bgcolor: "primary.main",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          Register
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
