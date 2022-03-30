import { Avatar, CardHeader, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TTSGoogleNode from "../components/TTSGoogleNode";
import { debug } from "../constants";
import { db } from "../firebase/firebase";
import kakaoIcon from "../img/ic_kakao_talk.png";
import thinqIcon from "../img/ic_launcher_thinq.png";

function TextMessage(props) {
  const { image, slider, youtube, kakaotalk } = props;
  const [event, setEvent] = useState("null");
  const [icon, setIcon] = useState(thinqIcon);
  const [title, setTitle] = useState("ThinQ Talk");
  const [from, setFrom] = useState("최신규");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      setMessage("오늘 손주 태권도 상 받아 왔어요 (사진)");
    } else if (slider) {
      setTitle("ThinQ Gallery");
      setMessage("지호 어린이집 첫 등교했어요 (사진)");
    } else if (youtube) {
      setMessage("제가 좋아하는 걸그룹이예요 (동영상)");
    } else if (kakaotalk) {
      const getContents = async () => {
        const docSnap = await getDoc(doc(db, "thinq_talk", "contents"));
        setTitle("Kakao Talk");
        setIcon(kakaoIcon);
        setFrom(docSnap.data().from);
        setMessage(docSnap.data().text);
      };
      getContents();
    }
  }, [image, kakaotalk, slider, youtube]);

  const keyListener = useCallback(
    (e) => {
      setEvent(e.key);
      if (e.key === "Enter") {
        if (image || slider) {
          navigate("/detail", {
            replace: true,
            state: { keyevent: e.key, message: message, slider },
          });
        } else if (youtube) {
          setDoc(doc(db, "thinq_talk", "youtube"), {
            play: true,
          });
          setTimeout(() => {
            navigate("/", { replace: true });
            setDoc(doc(db, "thinq_talk", "application"), {
              poweron: false,
            });
          }, 500);
        }
      } else if (e.key === "GoBack") {
        // need finish web app
        navigate("/", { replace: true });
        setDoc(doc(db, "thinq_talk", "application"), {
          poweron: false,
        });
      }
    },
    [image, slider, youtube, navigate, message]
  );

  const clickListener = useCallback(
    (e) => {
      keyListener({ key: "Enter" });
    },
    [keyListener]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyListener);
    window.addEventListener("click", clickListener);
    return () => {
      window.removeEventListener("keydown", keyListener);
      window.removeEventListener("click", clickListener);
    };
  }, [clickListener, keyListener]);

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
          variant="outlined"
          sx={{
            backgroundColor: "#000000aa",
            width: 480,
            borderRadius: 20,
            p: 3,
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
                variant="rounded"
                src={icon}
              />
            }
            title={title}
            titleTypographyProps={{ variant: "h5" }}
          />
          <CardContent>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  bgcolor: red[300],
                  width: 56,
                  height: 56,
                  mr: 2,
                  my: "auto",
                }}
                aria-label="recipe"
              >
                {from?.charAt(0)}
              </Avatar>
              <Typography variant="h5" component="div">
                {from + " 님"}
              </Typography>
            </Box>
            <Paper elevation={10} sx={{ my: 2, mx: 2, p: 6, borderRadius: 4 }}>
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
        </Card>
      </Box>
      <TTSGoogleNode text={message} />
    </>
  );
}

export default TextMessage;
