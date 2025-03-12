import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { Box } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Grid container minHeight="100vh" width="100%">
      {/* Left Content Section */}
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Logo Container */}
        <Box
          sx={{
            width: "100%",
            p: "40px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Image
            src="/assets/logo.png"
            alt="Healthcare App Logo"
            width={97}
            height={32}
            priority
            style={{
              objectFit: "contain",
              objectPosition: "left",
            }}
          />
        </Box>

        {/* Form Content Container */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {children}
        </Box>
      </Grid>

      {/* Right Image Section */}
      <Grid position="relative" size={{ xs: 12, md: 6 }}>
        <Image
          src="/assets/auth.png"
          alt="Healthcare workers"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Grid>
    </Grid>
  );
}
