import { Raleway, Open_Sans } from "next/font/google";
import ThemeRegistry from "@/components/ThemeRegistry/ThemeRegistry";

// Load fonts
const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});
const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

export const metadata = {
  title: "Healthcare App",
  description: "A modern healthcare platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${raleway.variable} ${openSans.variable}`}>
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
