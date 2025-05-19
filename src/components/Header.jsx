import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Fade,
  Slide,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Navigation items
  const navItems = [
    { text: "Home", path: "/" },
    { text: "Country", path: "/country" },
    { text: "About", path: "/about" }
  ];

  // Handle scroll effect
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  // Handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Check if route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Slide appear={false} direction="down" in={!scrolled || !mounted}>
      <AppBar
        position="sticky"
        elevation={scrolled ? 4 : 1}
        sx={{
          bgcolor: "white",
          color: "black",
          borderBottom: "1px solid #eee",
          transition: "all 0.3s ease-in-out",
          transform: scrolled ? "translateY(0)" : "none",
          boxShadow: scrolled 
            ? "0 4px 20px rgba(0, 0, 0, 0.08)" 
            : "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: 1200,
            mx: "auto",
            width: "100%",
            py: isMobile ? 1 : 1.5,
            px: isMobile ? 2 : 3,
            transition: "padding 0.3s ease",
          }}
        >
          {/* Left: Logo with animation */}
          <Fade in={mounted} timeout={800}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                fontWeight: 600,
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                "& .globe": {
                  display: "inline-block",
                  mr: 1,
                  animation: "spin 10s linear infinite",
                  "@keyframes spin": {
                    "0%": { transform: "rotate(0deg)" },
                    "100%": { transform: "rotate(360deg)" }
                  }
                },
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  color: "primary.main",
                }
              }}
              onClick={() => handleNavigation("/")}
            >
              <span className="globe">🌍</span> Country Explorer
            </Typography>
          </Fade>

          {/* Right: Desktop Nav Buttons with animations */}
          {!isMobile && (
            <Box sx={{ display: "flex" }}>
              {navItems.map((item, index) => (
                <Fade 
                  key={item.text} 
                  in={mounted} 
                  timeout={800 + (index * 200)}
                >
                  <Button 
                    color="inherit" 
                    onClick={() => handleNavigation(item.path)}
                    sx={{
                      mx: 1,
                      position: "relative",
                      fontWeight: isActive(item.path) ? 700 : 500,
                      color: isActive(item.path) ? "primary.main" : "inherit",
                      "&::after": {
                        content: "''",
                        position: "absolute",
                        width: isActive(item.path) ? "80%" : "0%",
                        height: "3px",
                        bottom: "0",
                        left: "10%",
                        backgroundColor: "primary.main",
                        transition: "width 0.3s ease",
                        borderRadius: "3px"
                      },
                      "&:hover": {
                        backgroundColor: "transparent",
                        "&::after": {
                          width: "80%",
                        }
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                </Fade>
              ))}
            </Box>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <IconButton 
              edge="end" 
              color="inherit" 
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ 
                transition: "transform 0.3s ease",
                "&:hover": { transform: "rotate(90deg)" } 
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>

        {/* Mobile Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: "70%",
              maxWidth: "300px",
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              padding: 2,
            }
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              <span className="globe" style={{ marginRight: '8px' }}>🌍</span> 
              Country Explorer
            </Typography>
          </Box>
          
          <List>
            {navItems.map((item, index) => (
              <ListItem 
                key={item.text}
                button
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  backgroundColor: isActive(item.path) ? "rgba(0, 0, 0, 0.04)" : "transparent",
                  borderLeft: isActive(item.path) ? "4px solid" : "0px solid",
                  borderColor: "primary.main",
                  pl: isActive(item.path) ? 2 : 3,
                  transition: "all 0.2s ease",
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 700 : 500,
                    color: isActive(item.path) ? "primary.main" : "inherit",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </AppBar>
    </Slide>
  );
}