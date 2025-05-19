import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 260,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/country/${country.name.common}`)}>
        <CardMedia
          component="img"
          height="140"
          image={country.flags?.svg || country.flags?.png}
          alt={`${country.name.common} flag`}
          loading="lazy"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
            {country.name.common}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🌍 Region: {country.region}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🧭 Subregion: {country.subregion || "—"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            👥 Population: {country.population.toLocaleString()}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          href={`https://en.wikipedia.org/wiki/${country.name.common}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default CountryCard;
