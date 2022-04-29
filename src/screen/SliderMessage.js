import { Avatar, Box, CardHeader, Chip, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useRecoilValue } from "recoil";
import { debug } from "../data/constants";
import { imageUrlsState } from "../data/imageUrls";
import { db } from "../firebase/firebase";
import thinqIcon from "../img/ic_launcher_thinq.png";
import "./SliderMessage.css";

function SliderMessage(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState(location.state.keyevent);
  const [autoplay, setAutoplay] = useState(true);
  const [imgIndex, setImgIndex] = useState(
    Number(localStorage.getItem("imgIndex")) || 0
  );

  const imageItems = useRecoilValue(imageUrlsState);
  const sliderRef = useRef();

  useEffect(() => {
    const keyListener = (e) => {
      setEvent(e.key);
      if (e.key === "Enter" || e.key === "GoBack") {
        navigate("/", { replace: true });
        setDoc(doc(db, "thinq_talk", "application"), {
          poweron: false,
        });
      } else if (e.key === "ArrowLeft") {
        setAutoplay(false);
        sliderRef.current.goBack();
      } else if (e.key === "ArrowRight") {
        setAutoplay(false);
        sliderRef.current.goNext();
      } else if (e.key === "ArrowUp") {
        // go hwakdae
        navigate("/viewer", {
          state: { imgIndex: imgIndex },
        });
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
  }, [imageItems, imgIndex, navigate]);

  useEffect(() => localStorage.setItem("imgIndex", imgIndex), [imgIndex]);

  return (
    <>
      {debug && (
        <Box sx={{ position: "absolute", top: 0, left: 4 }}>
          <Typography variant="h6" component="div" color="red">
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
            width: 700,
            backgroundColor: "#000000aa",
            borderRadius: 20,
            p: 2,
            overflow: "visible",
          }}
        >
          <Box sx={{ mt: -4, ml: 5 }}>
            <Chip
              label="ThinQ 알리미"
              variant="outlined"
              sx={{ backgroundColor: "#000000dd", px: 1, py: 2.5 }}
              avatar={<Avatar alt="Remy Sharp" src={thinqIcon} />}
            />
          </Box>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
                variant="rounded"
                src={thinqIcon}
              />
            }
            title={
              location.state.slider
                ? "최신규 님의 갤러리"
                : "최신규 님의 메세지"
            }
            titleTypographyProps={{ variant: "h6" }}
            sx={{ pb: 0 }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Paper
              variant="outlined"
              sx={{
                bgcolor: "#000000aa",
                px: 1,
                py: 2,
                borderRadius: 4,
              }}
            >
              <Typography gutterBottom variant="body2" sx={{ mx: 1 }}>
                {location.state.message}
              </Typography>
              <Slide
                ref={sliderRef}
                duration={2000}
                arrows={imageItems.length > 1}
                indicators={imageItems.length > 1}
                // infinite={imageItems.length > 1}
                infinite={false}
                autoplay={imageItems.length > 1 && autoplay}
                onChange={(oldTarget, newTarget) => {
                  console.log("old:", oldTarget, "new:", newTarget);
                  setImgIndex(newTarget);
                }}
                defaultIndex={imgIndex}
              >
                {imageItems.map((slideImage, index) => (
                  <div
                    className="each-slide"
                    key={index}
                    style={{ textAlign: "center" }}
                  >
                    <img src={slideImage} alt="" width="540px" />
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

export default SliderMessage;
