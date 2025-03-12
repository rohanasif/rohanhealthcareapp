import { createTheme } from "@mui/material/styles";
import { Raleway, Open_Sans } from "next/font/google";

// Load fonts
const raleway = Raleway({ subsets: ["latin"], display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });

const theme = createTheme({
  palette: {
    primary: { main: "#15683A" },
    secondary: { main: "#525252" },
    background: { default: "#F5F5F5", paper: "#FFFFFF" },
    text: { primary: "#333333", secondary: "#666666" },
  },
  typography: {
    fontFamily: raleway.style.fontFamily,
    body1: { fontFamily: openSans.style.fontFamily },
    body2: { fontFamily: openSans.style.fontFamily },
  },
  shape: { borderRadius: 8 },
});

export default theme;
