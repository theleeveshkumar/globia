import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
  Grid,
  Divider,
  Card,
  CardContent,
  Button,
  Skeleton,
  Alert,
  IconButton,
  Tooltip,
  Tab,
  Tabs,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MapIcon from "@mui/icons-material/Map";
import PublicIcon from "@mui/icons-material/Public";
import TranslateIcon from "@mui/icons-material/Translate";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [neighboringCountries, setNeighboringCountries] = useState([]);
  const [loadingNeighbors, setLoadingNeighbors] = useState(false);

  useEffect(() => {
    const loadCountryData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );

        if (!response.ok) {
          throw new Error(`Country not found (Status: ${response.status})`);
        }

        const data = await response.json();
        setCountry(data[0]);

        // Check if country is in favorites
        const favorites = JSON.parse(
          localStorage.getItem("favoriteCountries") || "[]"
        );
        setIsFavorite(favorites.includes(data[0].cca3));

        // If country has borders, fetch the neighboring countries
        if (data[0].borders && data[0].borders.length > 0) {
          loadNeighboringCountries(data[0].borders);
        }
      } catch (err) {
        setError(`Failed to load country data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    loadCountryData();
  }, [name]);

  const loadNeighboringCountries = async (borderCodes) => {
    setLoadingNeighbors(true);
    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(",")}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch neighboring countries");
      }

      const data = await response.json();
      setNeighboringCountries(data);
    } catch (err) {
      console.error("Error loading neighboring countries:", err);
    } finally {
      setLoadingNeighbors(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleFavorite = () => {
    if (!country) return;

    const favorites = JSON.parse(
      localStorage.getItem("favoriteCountries") || "[]"
    );

    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (code) => code !== country.cca3
      );
      localStorage.setItem(
        "favoriteCountries",
        JSON.stringify(updatedFavorites)
      );
    } else {
      favorites.push(country.cca3);
      localStorage.setItem("favoriteCountries", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  const formatPopulation = (population) => {
    if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)} million`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)} thousand`;
    } else {
      return population.toString();
    }
  };

  const renderLoadingState = () => (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Skeleton
            variant="rectangular"
            height={250}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Skeleton variant="text" height={60} width="80%" />
          <Skeleton variant="text" height={30} width="60%" />
          <Skeleton variant="text" height={30} width="40%" />
          <Skeleton variant="text" height={30} width="70%" />
          <Skeleton variant="text" height={30} width="50%" />
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              sx={{ borderRadius: 4 }}
            />
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              sx={{ borderRadius: 4 }}
            />
            <Skeleton
              variant="rectangular"
              width={80}
              height={32}
              sx={{ borderRadius: 4 }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  if (loading) return renderLoadingState();

  if (error) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", mt: 4, p: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          component={Link}
          to="/"
          variant="contained"
          startIcon={<ArrowBackIcon />}
        >
          Back to Countries
        </Button>
      </Box>
    );
  }

  if (!country) return null;

  const renderOverview = () => (
    <Grid container spacing={4}>
      <Grid item xs={12} md={5}>
        <Box sx={{ position: "relative" }}>
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.flags?.alt || `${country.name.common} flag`}
            style={{
              width: "100%",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Tooltip
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <IconButton
              onClick={toggleFavorite}
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              }}
              color="error"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
        </Box>

        {country.coatOfArms?.svg && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Coat of Arms
            </Typography>
            <img
              src={country.coatOfArms.svg}
              alt={`${country.name.common} coat of arms`}
              style={{ maxHeight: 150, maxWidth: "100%" }}
            />
          </Box>
        )}
      </Grid>

      <Grid item xs={12} md={7}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {country.name.common}
          </Typography>
          <Button
            component={Link}
            to="/country"
            startIcon={<ArrowBackIcon />}
            variant="outlined"
            size="small"
          >
            Back
          </Button>
        </Box>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {country.name.official}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Region:</strong> {country.region || "—"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Subregion:</strong> {country.subregion || "—"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Capital:</strong> {country.capital?.join(", ") || "—"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  {" "}
                  ({formatPopulation(country.population)})
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Area:</strong> {country.area?.toLocaleString() || "—"}{" "}
                km²
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>Currency:</strong>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map(
                        (currency) =>
                          `${currency.name} (${currency.symbol || ""})`
                      )
                      .join(", ")
                  : "—"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Languages:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {country.languages
              ? Object.values(country.languages).map((language, index) => (
                  <Chip
                    key={index}
                    label={language}
                    size="small"
                    icon={<TranslateIcon fontSize="small" />}
                    sx={{ mb: 1 }}
                  />
                ))
              : "—"}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const renderDetails = () => (
    <Grid container spacing={3}>
      {/* Geography */}
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <PublicIcon sx={{ mr: 1 }} />
              Geography
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Continent
                </Typography>
                <Typography variant="body1">
                  {country.continents?.join(", ") || "—"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Area
                </Typography>
                <Typography variant="body1">
                  {country.area?.toLocaleString() || "—"} km²
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Borders
                </Typography>
                <Typography variant="body1">
                  {country.borders?.length
                    ? `${country.borders.length} countries`
                    : "No land borders"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Landlocked
                </Typography>
                <Typography variant="body1">
                  {country.landlocked ? "Yes" : "No"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Society */}
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <PeopleIcon sx={{ mr: 1 }} />
              Society
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Population
                </Typography>
                <Typography variant="body1">
                  {country.population.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Gini Index
                </Typography>
                <Typography variant="body1">
                  {country.gini ? Object.values(country.gini)[0] : "—"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Languages
                </Typography>
                <Typography variant="body1">
                  {country.languages
                    ? Object.keys(country.languages).length
                    : "—"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Driving Side
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textTransform: "capitalize" }}
                >
                  {country.car?.side || "—"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Economic */}
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <AttachMoneyIcon sx={{ mr: 1 }} />
              Economy & Governance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Currencies
                </Typography>
                <Typography variant="body1">
                  {country.currencies
                    ? Object.keys(country.currencies).join(", ")
                    : "—"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  UN Member
                </Typography>
                <Typography variant="body1">
                  {country.unMember ? "Yes" : "No"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Independent
                </Typography>
                <Typography variant="body1">
                  {country.independent !== undefined
                    ? country.independent
                      ? "Yes"
                      : "No"
                    : "—"}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Top-Level Domain
                </Typography>
                <Typography variant="body1">
                  {country.tld?.join(", ") || "—"}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {/* Maps & Timezones */}
      <Grid item xs={12} md={6}>
        <Card elevation={2}>
          <CardContent>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", mb: 2 }}
            >
              <MapIcon sx={{ mr: 1 }} />
              Maps & Time
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  Timezones
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                  {country.timezones?.slice(0, 5).map((timezone, index) => (
                    <Chip key={index} label={timezone} size="small" />
                  ))}
                  {country.timezones?.length > 5 && (
                    <Chip
                      label={`+${country.timezones.length - 5} more`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{ mt: 2 }}
                  startIcon={<MapIcon />}
                  component="a"
                  href={country.maps?.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps
                </Button>
              </Grid>

              {country.maps?.openStreetMaps && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    startIcon={<MapIcon />}
                    component="a"
                    href={country.maps.openStreetMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    OpenStreetMap
                  </Button>
                </Grid>
              )}

              {country.name?.common && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    startIcon={<MapIcon />}
                    component="a"
                    href={`https://en.wikipedia.org/wiki/${encodeURIComponent(
                      country.name.common
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Wikipedia
                  </Button>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderNeighbors = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Neighboring Countries
      </Typography>

      {country.borders?.length === 0 && (
        <Alert severity="info">This country has no land borders.</Alert>
      )}

      {country.borders?.length > 0 && loadingNeighbors && (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress size={30} />
        </Box>
      )}

      {neighboringCountries.length > 0 && (
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {neighboringCountries.map((neighbor) => (
            <Grid item xs={12} sm={6} md={4} key={neighbor.cca3}>
              <Card
                elevation={2}
                component={Link}
                to={`/country/${neighbor.name.common}`}
                sx={{
                  width: "100%",
                  height: 160, // fixed height for consistency
                  display: "flex",
                  textDecoration: "none",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 100,
                    height: "100%", // match card height
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={neighbor.flags.png}
                    alt={`${neighbor.name.common} flag`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    flex: 1,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center", // vertically center the text
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {neighbor.name.common}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {neighbor.capital?.[0] || ""}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );

  return (
    <Paper
      sx={{
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        mb: 4,
        p: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      {renderOverview()}

      <Box sx={{ mt: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}
        >
          <Tab label="Details" />
          <Tab label="Neighbors" />
        </Tabs>

        {tabValue === 0 && renderDetails()}
        {tabValue === 1 && renderNeighbors()}
      </Box>
    </Paper>
  );
}
