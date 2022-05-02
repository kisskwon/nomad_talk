import { Avatar, CardHeader, Chip, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import thinqIcon from "../assets/img/ic_launcher_thinq.png";
import TTSGoogleNode from "../components/TTSGoogleNode";
import { debug } from "../data/constants";
import { db } from "../firebase/firebase";

function LauncherMessage(props) {
  const [event, setEvent] = useState("null");
  const [imgUrl, setImgUrl] = useState("");
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [ttsText, setTtsText] = useState();
  const navigate = useNavigate();

  const keyListener = useCallback(
    (e) => {
      setEvent(e.key);
      if (e.key === "Enter") {
        const message_type = props.shopping ? "browser" : "netflix";
        const data = props.shopping ? { show: true } : { play: true };
        setDoc(doc(db, "thinq_talk", message_type), data);
        setTimeout(() => {
          navigate("/", { replace: true });
          setDoc(doc(db, "thinq_talk", "application"), {
            poweron: false,
          });
        }, 500);
      } else if (e.key === "GoBack") {
        navigate("/", { replace: true });
        setDoc(doc(db, "thinq_talk", "application"), {
          poweron: false,
        });
      }
    },
    [navigate, props.shopping]
  );

  const clickListener = useCallback(
    (e) => {
      keyListener({ key: "Enter" });
    },
    [keyListener]
  );

  useEffect(() => {
    const getContents = async () => {
      const docSnap = await getDoc(doc(db, "thinq_talk", "contents"));
      setTitle(docSnap.data().title);
      setSummary(docSnap.data().summary);
      setImgUrl(docSnap.data().url);
      setMessage(docSnap.data().message);
    };
    getContents();
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
    if (!message) {
      return;
    }
    setTtsText({ message: message });
  }, [message]);

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
            width: 620,
            borderRadius: 20,
            p: 2,
            pb: 0,
            overflow: "visible",
          }}
        >
          <Box sx={{ mt: -4, ml: 4 }}>
            <Chip
              label="ThinQ Talk"
              variant="outlined"
              sx={{ backgroundColor: "#000000dd", px: 1, py: 2 }}
              avatar={<Avatar alt="Remy Sharp" src={thinqIcon} />}
            />
          </Box>
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
                variant="rounded"
                src={
                  props.shopping
                    ? "https://cdn-icons-png.flaticon.com/512/3081/3081648.png"
                    : "https://www.freepnglogos.com/uploads/netflix-logo-app-png-16.png"
                }
              />
            }
            title={title?.length > 15 ? title.substring(0, 14) + "..." : title}
            titleTypographyProps={{ variant: "h6" }}
            sx={{ pb: 0 }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Paper
              variant="outlined"
              sx={{ px: 2, py: 2, bgcolor: "#000000aa", borderRadius: 4 }}
            >
              <div style={{ textAlign: "center" }}>
                <img src={imgUrl} alt="" width="550px" />
              </div>
              <Typography variant="subtitle2">
                {(message !== "none" && message) || summary}
              </Typography>
            </Paper>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              {'리모콘의 "OK" 버튼을 눌러 ' +
                (props.shopping ? "자세히 보기" : "재생하기")}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      {ttsText && <TTSGoogleNode text={ttsText} />}
    </>
  );
}

export default LauncherMessage;
