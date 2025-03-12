import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box sx={{ position: "relative" }}>
      {/* Logo */}
      <Box
        sx={{
          position: "absolute",
          top: 40,
          left: 40,
          zIndex: 1,
          width: 97,
          height: 40,
        }}
      >
        <Image
          src="/assets/logo.png"
          alt="Healthcare App Logo"
          fill
          priority
          style={{
            objectFit: "contain",
            objectPosition: "left",
          }}
        />
      </Box>

      <Grid
        container
        sx={{
          minHeight: "100vh",
          width: "100%",
        }}
      >
        {/* Left Content Section */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Grid>

        {/* Right Image Section */}
        <Grid position="relative" size={{ xs: 12, md: 6 }}>
          <Image
            src="/assets/auth.png"
            alt="Healthcare workers"
            fill
            priority
            objectFit="cover"
            objectPosition="center"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
