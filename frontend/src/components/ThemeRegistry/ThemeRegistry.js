"use client";

import createCache from "@emotion/cache";
import { useState } from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";

// Create an Emotion cache instance
const createEmotionCache = () => createCache({ key: "mui", prepend: true });

export default function ThemeRegistry({ children }) {
  const [cache] = useState(createEmotionCache);

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
