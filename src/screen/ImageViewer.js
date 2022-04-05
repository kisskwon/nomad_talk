import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debug } from "../data/constants";

function ImageViewer(props) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === "GoBack") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [location, navigate]);

  return (
    <>
      {debug && (
        <Box sx={{ position: "absolute", top: 0, left: 4 }}>
          <Typography variant="h6" component="div" color="red">
            {location.state.imgIndex}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000000aa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={location.state.image}
          alt=""
          width="80%"
          height="80%"
          style={{ objectFit: "contain" }}
        />
      </Box>
    </>
  );
}

export default ImageViewer;
