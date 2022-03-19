import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { imageUrlsState } from "../data/imageUrls";
import { db, storage } from "./firebase";
import singleImg from "../img/takkwan.jpeg";

let initDB = true;
let initTypeDB = false;

const useNavigation = () => {
  const nativeNavigate = useNavigate();
  const navigate = (destination, options) => {
    nativeNavigate(destination, options);
  };

  return { navigate };
};

function StoreObserver(props) {
  const [updated, setUpdated] = useState(-1);
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
        console.log("kks", "listAll", res);
        res.items.forEach((itemRef) => {
          console.log("kks", "itemRef", itemRef.name);
          getDownloadURL(itemRef).then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = "blob";
            xhr.onload = (event) => {
              const blob = xhr.response;
              setImageUrls((prev) => [
                ...prev,
                <img src={window.URL.createObjectURL(blob)} alt="" width="750px" />,
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
    const unsubscribe = onSnapshot(doc(db, "gallery", "modified"), (doc) => {
      console.log("kks", "onSnapshot", doc.data());
      if (!initDB) {
        initDB = true;
        return;
      }
      setUpdated(doc.data().modified);
    });
    const unsubscribeType = onSnapshot(doc(db, "messages", "type"), (doc) => {
      console.log("kks", "onSnapshot", doc.data());
      if (!initTypeDB) {
        initTypeDB = true;
        return;
      }
      setMsgtype(doc.data().type);
    });
    return () => {
      unsubscribe();
      unsubscribeType();
    }
  }, []);

  useEffect(() => {
    if (updated !== -1) {
      predownload();
    }
  }, [predownload, updated]);

  useEffect(() => {
    if (updated !== -1) {
      navigation.current.navigate("/slider");
      setDoc(doc(db, "messages", "type"), {
        type: "slider",
      });
    }
  }, [updated]);

  useEffect(() => {
    if (msgtype === "single") {
      setImageUrls([<img src={singleImg} alt="" width="750px" />]);
      navigation.current.navigate("/image");
    } else if (msgtype === "youtube") {
      navigation.current.navigate("/youtube");
    }
  }, [msgtype, setImageUrls]);
  return null;
}

export default StoreObserver;
