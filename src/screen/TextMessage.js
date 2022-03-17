import { Avatar, CardHeader, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../img/ic_launcher_thinq.png";

const card = (message) => (
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
      <Box sx={{ display: "flex" }}>
        <Avatar
          sx={{ bgcolor: red[300], width: 56, height: 56, mr: 2, my: "auto" }}
          aria-label="recipe"
        >
          최
        </Avatar>
        <Typography variant="h5" component="div">
          최신규 님
        </Typography>
      </Box>
      <Paper elevation={10} sx={{ my: 2, ml: 8, p: 6, borderRadius: 4 }}>
        <Typography variant="body2">{message}</Typography>
      </Paper>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        리모콘의 "OK" 버튼을 눌러 <br />
        자세히 보기
      </Typography>
    </CardContent>
  </React.Fragment>
);

function TextMessage(props) {
  const { image, youtube } = props;

  const [shown, setShown] = useState(true);
  const [event, setEvent] = useState("null");
  const navigate = useNavigate();

  const keyListener = useCallback(
    (e) => {
      setEvent(e.key);
      if (e.key === "Enter") {
        if (image) {
          console.log("kks", "go detail");
          navigate("/detail", { replace: true, state: e.key });
        } else if (youtube) {
          setShown(false);
        }
      } else if (e.key === "GoBack") {
        // need finish web app
        setShown(false);
      }
    },
    [image, navigate, youtube]
  );

  const clickListener = useCallback((e) => {
    console.log("kks", e);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("click", clickListener);
    };
  }, [clickListener, keyListener]);

  useEffect(() => {
    if (youtube) {
      setShown(true);
      setTimeout(() => {
        setShown(false);
      }, 10000);
    }
  }, [youtube]);

  const message = image
    ? "오늘 손주 태권도 상 받아 왔어요~ (사진)"
    : "제가 좋아하는 걸그룹이예요~ (동영상)";

  return (
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
          variant="outlined"
          sx={{
            backgroundColor: "#000000aa",
            width: 480,
            borderRadius: 20,
            p: 3,
          }}
        >
          {card(message)}
        </Card>
      </Box>
    </>
  );
}

export default TextMessage;
