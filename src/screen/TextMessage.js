import { Avatar, CardHeader, Chip, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TTSGoogleNode from "../components/TTSGoogleNode";
import { debug } from "../data/constants";
import { db } from "../firebase/firebase";
import kakaoIcon from "../img/ic_kakao_talk.png";
import thinqIcon from "../img/ic_launcher_thinq.png";

function TextMessage(props) {
  const { image, slider, youtube, kakaotalk } = props;
  const [event, setEvent] = useState("null");
  const [icon, setIcon] = useState(thinqIcon);
  const [from, setFrom] = useState(null);
  const [message, setMessage] = useState(null);
  const [ttsText, setTtsText] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      setFrom("최신규");
      setMessage("오늘 이준이 태권도 금메달 땄어요 (사진)");
    } else if (slider) {
      setFrom("최신규");
      setMessage("서준이 어린이집 첫 등원했어요 (사진)");
    } else if (youtube) {
      setFrom("최신규");
      setMessage("제가 좋아하는 걸그룹이예요 (동영상)");
    } else if (kakaotalk) {
      const getContents = async () => {
        const docSnap = await getDoc(doc(db, "thinq_talk", "contents"));
        setIcon(kakaoIcon);
        setFrom(docSnap.data().from);
        setMessage(docSnap.data().text);
      };
      getContents();
    }
  }, [image, kakaotalk, slider, youtube]);

  useEffect(() => {
    if (message !== null) {
      console.log("set ttstext");
      setTtsText({ from: from, message: message });
    }
  }, [from, message]);

  const keyListener = useCallback(
    (e) => {
      setEvent(e.key);
      if (e.key === "Enter") {
        if (image || slider) {
          localStorage.setItem("imgIndex", 0);
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
        } else if (kakaotalk) {
          navigate("/", { replace: true });
          setDoc(doc(db, "thinq_talk", "application"), {
            poweron: false,
          });
        }
      } else if (e.key === "GoBack") {
        // need finish web app
        navigate("/", { replace: true });
        setDoc(doc(db, "thinq_talk", "application"), {
          poweron: false,
        });
      }
    },
    [image, slider, youtube, kakaotalk, navigate, message]
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
            overflow: "visible",
          }}
        >
          <Box sx={{ mt: -5, ml: 5 }}>
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
                src={icon}
              />
            }
            title={from + " 님"}
            titleTypographyProps={{ variant: "h6" }}
            sx={{ pb: 0 }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Paper
              elevation={10}
              sx={{
                mb: 2,
                p: 6,
                borderRadius: 4,
                minHeight: "160px",
              }}
            >
              <Typography variant="body2">{message}</Typography>
            </Paper>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {kakaotalk ? (
                <>
                  리모콘의 "OK"를 눌러 <br /> TV화면으로 돌아가기
                </>
              ) : (
                <>
                  리모콘의 "OK" 버튼을 눌러 <br /> 자세히 보기
                </>
              )}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {ttsText && <TTSGoogleNode text={ttsText} />}
    </>
  );
}

export default TextMessage;
