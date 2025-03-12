import { Box, Paper, Typography, Grid2 } from "@mui/material";

export default function Register() {
  return (
    <Box
      sx={{
        maxWidth: "444px",
        mx: "auto",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4, display: "flex", flexDirection: "column", gap: 3 }}
      >
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          Create an account
        </Typography>
        <form>
          <Grid2 container spacing={2}>
            <Grid2></Grid2>
          </Grid2>
        </form>
      </Paper>
    </Box>
  );
}
