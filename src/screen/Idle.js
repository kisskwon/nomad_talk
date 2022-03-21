import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function Idle(props) {
  return (
    <Box sx={{ position: "absolute", top: 0, left: 4 }}>
      <Typography variant="h6" component="div" color="red">
        {"Connected"}
      </Typography>
    </Box>
  );
}

export default Idle;
