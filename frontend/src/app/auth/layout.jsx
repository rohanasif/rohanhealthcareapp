import Grid from "@mui/material/Grid2";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
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
  );
}
