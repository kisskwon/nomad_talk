import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyBsGuLrlLspy3-lVGxliRoLtJEnhB25njQ",
  authDomain: "lg-mbsu.firebaseapp.com",
  projectId: "lg-mbsu",
  storageBucket: "lg-mbsu.appspot.com",
  messagingSenderId: "593238996806",
  appId: "1:593238996806:web:126a4b2bde60a07a715747",
  measurementId: "G-YQZ27KPFBZ",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const storage = getStorage();
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { storage, db };
