import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
  IconButton,
  Fade,
  Slide,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Example project links
  const projectLinks = [
    { name: "Project One", url: "https://github.com/yourname/project-one" },
    { name: "Project Two", url: "https://github.com/yourname/project-two" },
  ];

  return (
    <Slide appear={false} direction="up" in>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          top: "auto",
          bottom: 0,
          bgcolor: "white",
          color: "black",
          borderTop: "1px solid #eee",
          width: "100%",
          height: "64px",
          zIndex: theme.zIndex.drawer + 1,
          px: isMobile ? 2 : 3,
          py: 1.5,
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            mx: "auto",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: isMobile ? 1 : 0,
          }}
        >
          {/* Left: GitHub Link */}
          <Fade in timeout={800}>
            <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
              <IconButton
                component="a"
                href="https://theleeveshkumar.vercel.app/"
                rel="noopener noreferrer"
                color="inherit"
                sx={{ mr: 1 }}
              >
                <GitHubIcon />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
              </Typography>
            </Box>
          </Fade>
        </Toolbar>
      </AppBar>
    </Slide>
  );
}
