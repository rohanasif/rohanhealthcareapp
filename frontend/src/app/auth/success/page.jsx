"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import authService from "@/services/authService";

export default function AuthSuccess() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          throw new Error("No token provided");
        }

        const data = await authService.verifyToken(token);
        await login(data.user, token);

        const callbackUrl = searchParams.get("callbackUrl") || "/";
        router.push(decodeURIComponent(callbackUrl));
      } catch (error) {
        console.error("Auth error:", error);
        router.push(
          `/auth/signin?error=${encodeURIComponent(
            error.message || "Authentication failed",
          )}`,
        );
      }
    };

    handleAuthSuccess();
  }, [router, searchParams, login]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      gap={2}
    >
      <CircularProgress />
      <Typography>Completing authentication...</Typography>
    </Box>
  );
}
