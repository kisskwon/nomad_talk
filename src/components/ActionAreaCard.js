import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";

export default function ActionAreaCard() {
  return (
    <Box
      sx={{
        position: "absolute",
        right: 10,
        bottom: 10,
      }}
    >
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: "#000000aa",
          minWidth: 480,
          borderRadius: 20,
        }}
      >
        <CardActionArea to={"/text"} component={Link}>
          <CardMedia
            component="img"
            height="200"
            image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            alt="green iguana"
          />
          <CardContent>
            <Box sx={{ p: 3 }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
