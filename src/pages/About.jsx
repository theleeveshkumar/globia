import React from "react";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import { motion } from "framer-motion";

export default function About() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      component="section"
      sx={{
        pt: "80px",
        minHeight: "calc(100vh - 64px)",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        color: "#333",
        fontFamily: "'Poppins', sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              textAlign: "center",
              background: "linear-gradient(to right, #ff416c, #ff4b2b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 4,
            }}
          >
            About Country Explorer
          </Typography>

          {[
            `Country Explorer is a modern web application built with React.js and Material UI, designed to deliver detailed information about every country in the world. It connects to the public and powerful REST Countries API to fetch real-time, accurate data on global nations.`,
            `From population and currencies to spoken languages, capital cities, flags, and continents — this application allows you to explore a wide range of facts with a clean, responsive, and intuitive interface.`,
            `It makes use of cutting-edge tools like React Router for navigation, custom hooks for state management, and a component-based structure to ensure scalability and maintainability. Material UI helps bring consistent theming, animations, and a mobile-friendly design out of the box.`,
            `Whether you're a student working on a geography project, a traveler planning your next destination, or simply curious about the world, Country Explorer offers a seamless way to dive into country-level insights from your browser.`,
            `This project is also a great reference for developers looking to learn how to integrate external APIs, build responsive SPAs (Single Page Applications), and apply frontend frameworks to real-world data-driven applications.`,
            `Explore, learn, and stay curious — the world is just a click away.`,
          ].map((paragraph, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
            >
              <Typography
                variant="body1"
                sx={{
                  mt: index === 0 ? 0 : 3,
                  lineHeight: 1.8,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  textAlign: "justify",
                }}
              >
                {paragraph.includes("REST Countries API") ? (
                  <>
                    Country Explorer is a modern web application built with{" "}
                    <strong>React.js</strong>, <strong>Framer Motion</strong> and <strong>Material UI</strong>, designed to deliver detailed
                    information about every country in the world. It connects to the public and powerful{" "}
                    <a
                      href="https://restcountries.com/v3.1/all"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: theme.palette.primary.main,
                        textDecoration: "underline",
                        fontWeight: 600,
                      }}
                    >
                      REST Countries API
                    </a>{" "}
                    to fetch real-time, accurate data on global nations.
                  </>
                ) : (
                  paragraph
                )}
              </Typography>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
}
