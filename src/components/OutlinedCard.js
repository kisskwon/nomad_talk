import { Avatar, CardHeader } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import * as React from "react";
import icon from "../img/ic_launcher_thinq.png";

const card = (
  <React.Fragment>
    <CardHeader
      avatar={
        <Avatar
          sx={{ width: 56, height: 56 }}
          aria-label="recipe"
          variant="rounded"
          src={icon}
        />
      }
      title={"ThinQTalk"}
      titleTypographyProps={{ variant: "h5" }}
    />
    <CardContent>
      <Avatar
        sx={{ bgcolor: red[300], width: 56, height: 56 }}
        aria-label="recipe"
      >
        최
      </Avatar>
      <Typography variant="h5" component="div">
        benevolent
      </Typography>
      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        adjective
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Learn More</Button>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <Box
      sx={{
        position: "fixed",
        right: 10,
        bottom: 10,
      }}
    >
      <Card
        variant="outlined"
        sx={{
          backgroundColor: "#000000aa",
          minWidth: 480,
          minHeight: 640,
          borderRadius: 20,
          p: 3,
        }}
      >
        {card}
      </Card>
    </Box>
  );
}
