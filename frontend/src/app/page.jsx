"use client";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundColor: "#f9f9f9",
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            {/* Text Column */}
            <Grid item xs={12} md={6}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: "2rem", sm: "2.25rem", md: "2.5rem" },
                  fontWeight: "bold",
                  mb: { xs: 1.5, md: 2 },
                  lineHeight: { xs: 1.2, md: 1.3 },
                }}
              >
                Your Journey In Healthcare Starts Here
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                  color: "text.secondary",
                  mb: { xs: 3, md: 4 },
                  lineHeight: { xs: 1.4, md: 1.6 },
                }}
              >
                Take your first step for free. Book an appointment, connect with
                healthcare providers, and take control of your health journey.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" color="primary" size="large">
                  Get Appointment
                </Button>
                {!isAuthenticated && (
                  <Button
                    component={Link}
                    href="/auth/signin"
                    variant="outlined"
                    color="primary"
                    size="large"
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </Grid>
            {/* Image Column */}
            <Grid item xs={12} md={6} sx={{ position: "relative" }}>
              <Box
                component="img"
                src="/assets/beautiful-asia-muslim-lady-wear-face-mask-using-laptop-business-reports-living-room.png"
                alt="Healthcare Professional"
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
              <Box
                component="img"
                src="/assets/image 63.png"
                alt="Decorative"
                sx={{
                  width: "40%",
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  borderRadius: 2,
                  boxShadow: 3,
                  display: { xs: "none", sm: "block" },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* We Provide Health with Qabla */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#ffffff",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{
              mb: { xs: 1.5, md: 2 },
              fontWeight: "bold",
              fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
              lineHeight: 1.3,
            }}
          >
            We Provide Health with Qabla
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Discover a streamlined approach to healthcare. Our platform connects
            patients with qualified professionals, offering a seamless
            appointment system, comprehensive health tracking, and reliable
            support every step of the way.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Accessible
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easily book appointments and consult with healthcare
                  providers, all from the comfort of your home.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Efficient
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your schedule, track your health data, and get
                  reminders for upcoming checkups.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  Trusted
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Our network of certified healthcare professionals ensures
                  quality care you can depend on.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Find How The App Works */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#f9f9f9",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Find How The App Works
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Qabla simplifies the patient-provider relationship with an intuitive
            interface and easy-to-follow steps.
          </Typography>
          <Grid container spacing={4}>
            {/* Step 1 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/assets/image (3).png"
                  alt="Step 1: Sign Up"
                  sx={{
                    width: "100%",
                    height: "auto",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2 }}>
                  1. Sign Up
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create your free account to get started.
                </Typography>
              </Box>
            </Grid>
            {/* Step 2 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/assets/image (2).png"
                  alt="Step 2: Explore Services"
                  sx={{
                    width: "100%",
                    height: "auto",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2 }}>
                  2. Explore Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Browse our specialists and select the service you need.
                </Typography>
              </Box>
            </Grid>
            {/* Step 3 */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/assets/image (1).png"
                  alt="Step 3: Book & Manage"
                  sx={{
                    width: "100%",
                    height: "auto",
                    mb: 2,
                    borderRadius: 2,
                    boxShadow: 2,
                  }}
                />
                <Typography variant="h5" sx={{ mb: 2 }}>
                  3. Book & Manage
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Schedule appointments, get reminders, and manage your health
                  journey.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Get Appointment For Free */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#ffffff",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                Get Appointment For Free
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 4 }}
              >
                Book your first appointment at no cost. We believe in
                accessibility and quality care for everyone.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Book Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/woman-medical-doctor-uniform-holding-clipboard.png"
                alt="Doctor with Clipboard"
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Clients & Specialists */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#f9f9f9",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Our Clients & Specialists
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Meet some of our experts dedicated to providing top-notch healthcare
            services.
          </Typography>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
            {[
              "/assets/AdobeStock_251586919.png",
              "/assets/AdobeStock_321156753.png",
              "/assets/AdobeStock_251586919.png",
              "/assets/AdobeStock_321156753.png",
            ].map((src, index) => (
              <Grid item xs={6} sm={6} md={3} key={index}>
                <Card
                  sx={{
                    boxShadow: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "translateY(-4px)",
                      transition: "all 0.3s ease-in-out",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", paddingTop: "100%" }}>
                    <CardMedia
                      component="img"
                      image={src}
                      alt={`Specialist ${index + 1}`}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: src.includes("AdobeStock_321156753")
                          ? "center 10%"
                          : "center",
                      }}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                      }}
                    >
                      Dr. Specialist {index + 1}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontSize: { xs: "0.875rem", md: "1rem" },
                      }}
                    >
                      Specialist
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Our Portals */}
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          backgroundColor: "#ffffff",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            Our Portals
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{
              mb: 6,
              color: "text.secondary",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            Access Qabla on the go with our mobile app. Manage appointments,
            chat with providers, and stay updated on your health journey.
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, sm: 3, md: 4 }}
            justifyContent="center"
          >
            {[1, 2, 3].map((index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  component="img"
                  src="/assets/Untitled-1 2.png"
                  alt={`Mobile App Mockup ${index}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    mx: "auto",
                    boxShadow: 3,
                    borderRadius: 2,
                    display: "block",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: "#2f4f4f",
          color: "#ffffff",
          py: 4,
          textAlign: "center",
          px: { xs: 2, md: 4 },
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h5" sx={{ mb: 1 }}>
            قبلة (Qabla)
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            &copy; {new Date().getFullYear()} Qabla. All rights reserved.
          </Typography>
          <Typography variant="body2">
            <Link
              href="/privacy"
              style={{
                color: "#ffffff",
                marginRight: { xs: 8, sm: 16 },
                display: { xs: "block", sm: "inline" },
                marginBottom: { xs: 1, sm: 0 },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                color: "#ffffff",
                display: { xs: "block", sm: "inline" },
              }}
            >
              Terms of Service
            </Link>
          </Typography>
        </Container>
      </Box>
    </>
  );
}
