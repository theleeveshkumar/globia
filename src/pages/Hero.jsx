import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        height: "calc(100vh - 65px)",
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 3,
        py: 6,
      }}
    >
      <Grid
        container
        spacing={6}
        alignItems="center"
        justifyContent="center"
        sx={{
          maxWidth: 1300,
          mx: "auto",
          background: "rgba(255, 75, 75, 0.1)",
          boxShadow: "0 12px 48px rgba(255, 75, 75, 0.2)",
          backdropFilter: "blur(12px)",
          borderRadius: 4,
          p: { xs: 4, md: 6 },
        }}
      >
        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: isMobile ? "center" : "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                fontWeight={800}
                sx={{
                  color: "rgb(26, 25, 25)",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                  lineHeight: 1.2,
                }}
              >
                Explore Countries Around the World
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "rgba(17, 9, 9, 0.8)",
                  opacity: 0.9,
                  mb: 4,
                }}
              >
                Discover country information, flags, maps, populations, and more
                with one click.
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: "30px",
                  px: 5,
                  fontWeight: 600,
                  textTransform: "none",
                  background:
                    "linear-gradient(45deg, #4a4a4a 50%, #a1400b 90%)",
                  boxShadow: "0 4px 20px rgba(254, 107, 139, 0.5)",
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #333 30%, #a1400b 90%)",
                    boxShadow: "0 6px 24px rgba(255, 142, 83, 0.7)",
                  },
                }}
                onClick={() => navigate("/country")}
              >
                Get Started
              </Button>
            </motion.div>
          </Box>
        </Grid>

        {/* Image Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1541987736-41744aa9b7d7?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="World Map Premium"
              sx={{
                width: "100%",
                borderRadius: 4,
                display: isMobile ? "none" : "block",
                maxHeight: "450px",
                objectFit: "cover",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
