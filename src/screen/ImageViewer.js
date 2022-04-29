import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debug } from "../data/constants";
import { Slide } from "react-slideshow-image";
import { useRecoilValue } from "recoil";
import { imageUrlsState } from "../data/imageUrls";
import "./ImageViewer.css"

const properties = {
  autoplay: false,
  infinite: false,
  prevArrow: <button className="nav default-nav" data-type="prev" aria-label="Previous Slide"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"></path></svg></button>,
  nextArrow: <button className="nav default-nav" data-type="next" aria-label="Next Slide"><svg width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"></path></svg></button>
};

function ImageViewer(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [imgIndex, setImgIndex] = useState(location.state.imgIndex);

  const imageItems = useRecoilValue(imageUrlsState);
  const sliderRef = useRef();

  useEffect(() => {
    const keyListener = (e) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === "GoBack") {
        navigate(-1);
      } else if (e.key === "ArrowLeft") {
        sliderRef.current.goBack();
      } else if (e.key === "ArrowRight") {
        sliderRef.current.goNext();
      }
    };
    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [location, navigate]);

  useEffect(() => localStorage.setItem("imgIndex", imgIndex), [imgIndex]);

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
      className="image-viewer"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#000000aa",
        }}
      >
        <Slide
          ref={sliderRef}
          arrows={imageItems.length > 1}
          indicators={imageItems.length > 1}
          onChange={(oldTarget, newTarget) => {
            console.log("old:", oldTarget, "new:", newTarget);
            setImgIndex(newTarget);
          }}
          defaultIndex={imgIndex}
          {...properties}
        >
          {imageItems.map((slideImage, index) => (
            <div
              className="each-slide"
              key={index}
              style={{ textAlign: "center" }}
            >
              <img src={slideImage} alt="" width="70%" height="70%" />
            </div>
          ))}
        </Slide>
      </Box>
    </>
  );
}

export default ImageViewer;
