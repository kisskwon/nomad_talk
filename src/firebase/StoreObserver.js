import { doc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { imageUrlsState } from "../data/imageUrls";
import { db, storage } from "./firebase";

let initDB = false;

const useNavigation = () => {
  const nativeNavigate = useNavigate();
  const navigate = (destination) => {
    nativeNavigate(destination);
  };

  return { navigate };
};

function StoreObserver(props) {
  const [updated, setUpdated] = useState(-1);
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
                window.URL.createObjectURL(blob),
              ]);
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
      console.log("kks", "onSnapshot");
      if (!initDB) {
        initDB = true;
        return;
      }
      setUpdated(doc.data().modified);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (updated !== -1) {
      predownload();
    }
  }, [predownload, updated]);

  useEffect(() => {
    if (updated !== -1) {
      navigation.current.navigate("/image");
    }
  }, [updated]);
  return null;
}

export default StoreObserver;
