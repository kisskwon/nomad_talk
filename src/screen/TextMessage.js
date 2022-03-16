import {
  Avatar,
  Button,
  CardActionArea,
  CardHeader,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
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
  const [shown, setShown] = React.useState(true);
  const messageBox = useRef();
  React.useEffect(() => {
    messageBox.current.focus();
    if (props.youtube) {
      setTimeout(() => {
        setShown(false);
      }, 10000);
    }
  }, [props.youtube]);
  const message = props.image
    ? "오늘 손주 태권도 상 받아 왔어요~ (사진)"
    : "오늘 손녀 데뷔 했어요~ (동영상)";
  return (
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
        {props.image ? (
          <CardActionArea
            ref={messageBox}
            component={Link}
            to={"/detail"}
            disableRipple={true}
            sx={{ p: 0 }}
          />
        ) : (
          <CardActionArea
            ref={messageBox}
            component={Button}
            onClick={() => {}}
            sx={{ p: 0 }}
          />
        )}
        {card(message)}
      </Card>
    </Box>
  );
}

export default TextMessage;
