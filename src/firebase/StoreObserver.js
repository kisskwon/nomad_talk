import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

function StoreObserver(props) {
  const [, setUpdated] = useState({ modified: -1 });
  const navigate = useNavigate();

  useEffect(() => {
    // TODO query db
    const unsubscribe = onSnapshot(doc(db, "gallery", "modified"), (doc) => {
      console.log("kks", doc.data());
      setUpdated((state) => {
        if (state.modified === doc.data().modified) {
          return state;
        } else {
          if (state.modified !== -1) {
            navigate("/image", { replace: true });
          }
          return doc.data();
        }
      });
    });
    return unsubscribe;
  }, [navigate]);
  return null;
}

export default StoreObserver;
