"use client";
import { Box, Typography, Container } from "@mui/material";

export default function Home() {
  return (
    <Container
      component="main"
      sx={{
        minHeight: "100vh",
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
        }}
      >
        Your path to better health management starts here.
      </Typography>
    </Container>
  );
}
