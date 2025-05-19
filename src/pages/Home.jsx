import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CountryCard from "../components/CountryCard";
import { fetchCountryByName, fetchAllCountries } from "../api/countries";
import { useState, useEffect } from "react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.6 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [regionFilter, setRegionFilter] = useState("");

  useEffect(() => {
    fetchAllCountries()
      .then((data) => setAllCountries(data))
      .catch(() => setError("Failed to load countries data."));
  }, []);

  const filteredCountries = allCountries.filter((country) => {
    const matchesRegion = regionFilter ? country.region === regionFilter : true;
    const matchesSearch = searchTerm
      ? country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesRegion && matchesSearch;
  });

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const data = await fetchCountryByName(searchTerm);
      const filtered = regionFilter ? data.filter((c) => c.region === regionFilter) : data;
      setResults(filtered);
      if (filtered.length === 0) setError("No countries found with your search and filter.");
    } catch {
      setError("Country not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 2,
        background: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            p: { xs: 3, sm: 6 },
            bgcolor: "rgba(255, 75, 75, 0.1)",
            boxShadow: "0 12px 48px rgba(255, 75, 75, 0.2)",
            backdropFilter: "blur(12px)",
            borderRadius: 4,
            mb: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h3" fontWeight={900} gutterBottom>
            🌍 Country Explorer
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Search for any country and get detailed information like population,
            region, languages, and more.
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            mb: 4,
          }}
        >
          <Autocomplete
            freeSolo
            options={allCountries.map((c) => c.name.common)}
            inputValue={searchTerm}
            onInputChange={(event, newInputValue) => setSearchTerm(newInputValue)}
            sx={{ width: { xs: "100%", sm: 320 } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Country"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                variant="outlined"
                size="small"
              />
            )}
          />

          <FormControl sx={{ minWidth: 160, width: { xs: "100%", sm: 200 } }} size="small">
            <InputLabel id="region-select-label">Filter by Region</InputLabel>
            <Select
              labelId="region-select-label"
              value={regionFilter}
              label="Filter by Region"
              onChange={(e) => setRegionFilter(e.target.value)}
              size="small"
            >
              <MenuItem value="">All Regions</MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{ minWidth: 130, whiteSpace: "nowrap" }}
            disabled={loading}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setSearchTerm("");
              setRegionFilter("");
              setResults([]);
              setError(null);
            }}
            sx={{ minWidth: 130 }}
          >
            Clear Filters
          </Button>
        </Box>

        {loading && (
          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 3 }}>
              <CircularProgress size={40} />
            </Box>
          </motion.div>
        )}

        {error && (
          <motion.div variants={itemVariants}>
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="Not Found"
                width={140}
                style={{ opacity: 0.4, margin: "auto" }}
              />
              <Typography variant="h6" color="error" mt={2}>
                {error}
              </Typography>
              <Typography variant="body2" color="text.secondary" maxWidth={320} mx="auto">
                Try adjusting your search or region filter.
              </Typography>
            </Box>
          </motion.div>
        )}

        {(results.length > 0 || filteredCountries.length > 0) && !loading && !error && (
          <>
            <motion.div variants={itemVariants}>
              <Typography variant="subtitle1" align="center" sx={{ mb: 2 }}>
                Showing{" "}
                {results.length > 0 ? results.length : filteredCountries.slice(0, 20).length}{" "}
                countries{regionFilter && ` in ${regionFilter}`}
              </Typography>
            </motion.div>

            <Grid container justifyContent="center" spacing={3}>
              {(results.length > 0 ? results : filteredCountries.slice(0, 20)).map((country, index) => (
                <Grid item key={country.cca3} xs={12} sm={6} md={4} lg={3}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.07, duration: 0.3 }}
                  >
                    <CountryCard country={country} />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </motion.div>
    </Box>
  );
}
