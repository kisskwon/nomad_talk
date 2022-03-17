import { Avatar, Box, CardHeader, Paper } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { storage } from "../firebase/firebase";

function ImageMessage(props) {
  const location = useLocation();
  const [event, setEvent] = useState("prev: " + location.state);
  const [shown, setShown] = useState(true);
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      setEvent(e.key);
      if (e.key === "Enter" || e.key === "GoBack") {
        setShown(false);
      }
    };
    window.addEventListener("keydown", listener);
    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  useEffect(() => {
    const listRef = ref(storage, "Device.tv");

    listAll(listRef)
      .then((res) => {
        if (res.items.length === 0) {
          setImgUrl(
            "http://www.incheonilbo.com/news/photo/201006/387214_2982_1525.jpg"
          );
          return;
        }
        res.items.forEach((itemRef) => {
          console.log("kks", itemRef);
          getDownloadURL(itemRef).then((url) => {
            setImgUrl(url);
          });
        });
      })
      .catch((error) => {
        console.log("kks", "listAll error", error);
      });
  }, []);

  return (
    imgUrl && (
      <>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h1" component="div" color="red">
            {event}
          </Typography>
        </Box>
        <Box
          sx={{
            display: shown ? "block" : "none",
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
                <Typography gutterBottom variant="body2">
                  오늘 손주 태권도 상 받아 왔어요~
                </Typography>
                <CardMedia
                  component="img"
                  width="480"
                  image={imgUrl}
                  alt="green iguana"
                />
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
    )
  );
}

export default ImageMessage;
