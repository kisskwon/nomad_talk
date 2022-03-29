import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ImageViewer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("kks", location);
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
  );
}

export default ImageViewer;
