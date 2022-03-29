import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { imageUrlsState } from "../data/imageUrls";
import singleImg from "../img/takkwan.jpeg";
import { db, storage } from "./firebase";

let initDB = false;

const useNavigation = () => {
  const nativeNavigate = useNavigate();
  const navigate = (destination, options) => {
    nativeNavigate(destination, options);
  };

  return { navigate };
};

function StoreObserver(props) {
  const [msgtype, setMsgtype] = useState("");
  const [, setImageUrls] = useRecoilState(imageUrlsState);
  const resetImageUrls = useResetRecoilState(imageUrlsState);
  const navigation = useRef(useNavigation());

  const predownload = useCallback(() => {
    const listRef = ref(storage, "Device.tv");
    listAll(listRef)
      .then((res) => {
        setImageUrls((prev) => {
          prev.forEach((url) => window.URL.revokeObjectURL(url));
          return prev;
        });
        resetImageUrls();
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
              setImageUrls((prev) => [
                ...prev,
                window.URL.createObjectURL(blob),
              ]);
              window.URL.revokeObjectURL(blob);
            };
            xhr.open("GET", url);
            xhr.send();
          });
        });
      })
      .catch((error) => {
        console.log("kks", "listAll error", error);
      });
  }, [resetImageUrls, setImageUrls]);

  useEffect(() => {
    setDoc(doc(db, "thinq_talk", "application"), {
      poweron: true,
    });
    const unsubscribe = onSnapshot(
      doc(db, "thinq_talk", "message_type"),
      (doc) => {
        if (!initDB) {
          initDB = true;
          return;
        }
        setMsgtype(doc.data().type);
      }
    );
    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log("kks", msgtype);
    if (msgtype === "single") {
      setImageUrls([singleImg]);
      navigation.current.navigate("/image");
      setDoc(doc(db, "thinq_talk", "message_type"), {
        type: "",
      });
    } else if (msgtype === "slider") {
      predownload();
      navigation.current.navigate("/slider");
      setDoc(doc(db, "thinq_talk", "message_type"), {
        type: "",
      });
    } else if (msgtype === "youtube") {
      navigation.current.navigate("/youtube");
      setDoc(doc(db, "thinq_talk", "message_type"), {
        type: "",
      });
    } else if (msgtype === "shopping") {
      navigation.current.navigate("/shopping");
      setDoc(doc(db, "thinq_talk", "message_type"), {
        type: "",
      });
    } else if (msgtype === "netflix") {
      navigation.current.navigate("/netflix");
      setDoc(doc(db, "thinq_talk", "message_type"), {
        type: "",
      });
    }
  }, [msgtype, setImageUrls, predownload]);
  return null;
}

export default StoreObserver;
