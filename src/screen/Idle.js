import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

function Idle(props) {
  const [state, setState] = useState("Connected");
  useEffect(() => {
    const msgTypeDocRef = doc(db, "thinq_talk", "message_type");
    setTimeout(async () => {
      const msgTypeSnap = await getDoc(msgTypeDocRef);
      if (!msgTypeSnap.exists || msgTypeSnap.data().type === "") {
        return;
      }
      setState("Reload");
      setDoc(msgTypeDocRef, { type: "" }).then(() => {
        const stored = msgTypeSnap.data().type;
        setDoc(msgTypeDocRef, { type: stored });
      });
    }, 5000);
  }, []);
  return (
    <Box sx={{ position: "absolute", top: 0, left: 4 }}>
      <Typography variant="h6" component="div" color="red">
        {state}
      </Typography>
    </Box>
  );
}

export default Idle;
