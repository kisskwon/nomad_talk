import { Avatar, CardHeader, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { debug } from "../constants";
import { db } from "../firebase/firebase";

function NetflixMessage(props) {
  const [event, setEvent] = useState("null");
  const [imgUrl, setImgUrl] = useState(
    "https://occ-0-3109-58.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABQ1hKknTqoJLTSd81mwp-cHQPGps6VbddOZnx_wkqPyWysAH0GAlUssVag5bvEZ9hz_Z7VTkD0V_KA6EZnuhp7JgxbHV.jpg?r=1db"
  );
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const keyListener = useCallback(
    (e) => {
      setEvent(e.key);
      if (e.key === "Enter") {
        setDoc(doc(db, "thinq_talk", "netflix"), {
          play: true,
        });
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
    [navigate]
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
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{ width: 56, height: 56 }}
                aria-label="recipe"
                variant="rounded"
                src="https://scontent-ssn1-1.xx.fbcdn.net/v/t31.18172-1/13490708_1055815107843429_6253986289710696521_o.png?stp=dst-png_p148x148&amp;_nc_cat=1&amp;ccb=1-5&amp;_nc_sid=1eb0c7&amp;_nc_ohc=ZBg617M8aVEAX_N2Ysc&amp;_nc_ht=scontent-ssn1-1.xx&amp;oh=00_AT8yCYPxV8MTKprgaPQLgx3xwHTmQ6OAFqeLIOxqiZu8RA&amp;oe=6265DCAD"
              />
            }
            title={title}
            titleTypographyProps={{ variant: "h5" }}
            sx={{ pb: 0 }}
          />
          <CardContent sx={{ pt: 0 }}>
            <Paper
              variant="outlined"
              sx={{ px: 2, py: 2, bgcolor: "transparent" }}
            >
              <div style={{ textAlign: "center" }}>
                <img src={imgUrl} alt="" width="550px" />
              </div>
              <Typography variant="subtitle2">{summary}</Typography>
            </Paper>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ textAlign: "center" }}
            >
              리모콘의 "OK" 버튼을 눌러 <br />
              재생하기
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default NetflixMessage;
