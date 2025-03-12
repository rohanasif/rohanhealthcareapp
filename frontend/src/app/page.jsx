"use client";
import { Box, Typography, Container, Button } from "@mui/material";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Container
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)", // Subtract navbar height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "2.5rem", mb: 2 }}>
          Welcome to Healthcare App
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.2rem",
            color: (theme) => theme.palette.text.secondary,
            mb: 4,
            maxWidth: "600px",
          }}
        >
          Your path to better health management starts here. Connect with
          healthcare providers, manage appointments, and take control of your
          health journey.
        </Typography>
        {!isAuthenticated && (
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              href="/auth/register"
              variant="contained"
              color="primary"
              size="large"
            >
              Get Started
            </Button>
            <Button
              component={Link}
              href="/auth/signin"
              variant="outlined"
              color="primary"
              size="large"
            >
              Sign In
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}
