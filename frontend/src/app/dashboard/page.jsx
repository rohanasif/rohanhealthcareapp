"use client";
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/auth/signin");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user.name}!
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 4,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Box sx={{ display: "grid", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Email
              </Typography>
              <Typography>{user.email}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                {user.role}
              </Typography>
            </Box>
          </Box>
        </Paper>
        {/* Add more dashboard widgets here */}
      </Box>
    </Container>
  );
}
