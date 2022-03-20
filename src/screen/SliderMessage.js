import { Avatar, Box, CardHeader, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useRecoilValue } from "recoil";
import { debug } from "../constants";
import { imageUrlsState } from "../data/imageUrls";
import "./SliderMessage.css";

function ImageMessage(props) {
  const location = useLocation();
  const [event, setEvent] = useState("prev: " + location.state.keyevent);
  const imageItems = useRecoilValue(imageUrlsState);
  const navigate = useNavigate();
  const sliderRef = useRef();
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const keyListener = (e) => {
      setEvent(e.key);
      if (e.key === "Enter" || e.key === "GoBack") {
        navigate("/", { replace: true });
      } else if (e.key === "ArrowLeft") {
        setAutoplay(false);
        sliderRef.current.goBack();
      } else if (e.key === "ArrowRight") {
        setAutoplay(false);
        sliderRef.current.goNext();
      }
    };

    const clickListener = (e) => {
      keyListener({ key: "Enter" });
    };

    window.addEventListener("keydown", keyListener);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("click", clickListener);
    };
  }, [navigate]);
  return (
    <>
      {debug && (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" component="div" color="red">
            {event}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          position: "absolute",
          right: 10,
          bottom: 10,
        }}
      >
        <Card
          sx={{
            width: 800,
            backgroundColor: "#000000aa",
            borderRadius: 20,
            p: 2,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ bgcolor: red[300], width: 56, height: 56 }}
                aria-label="recipe"
                variant="rounded"
              >
                최
              </Avatar>
            }
            title={"최신규 님의 메세지"}
            titleTypographyProps={{ variant: "h6" }}
          />
          <CardContent>
            <Paper
              variant="outlined"
              sx={{
                bgcolor: "transparent",
                px: 1,
                py: 2,
              }}
            >
              <Typography gutterBottom variant="body2">{location.state.message}</Typography>
              <Slide
                ref={sliderRef}
                duration={2000}
                arrows={imageItems.length > 1}
                indicators={imageItems.length > 1}
                autoplay={imageItems.length > 1 && autoplay}
              >
                {imageItems.map((slideImage, index) => (
                  <div className="each-slide" key={index}>
                    {slideImage}
                  </div>
                ))}
              </Slide>
            </Paper>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              리모콘의 "OK"를 눌러 TV화면으로 돌아가기
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default ImageMessage;
