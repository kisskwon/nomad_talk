import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  // firebase 설정과 관련된 개인 정보
  apiKey: "AIzaSyCs4V88rHCCpXAhPV3SefY9zA7kAFktUOU",
  authDomain: "flutter-damda-gallery2.firebaseapp.com",
  projectId: "flutter-damda-gallery2",
  storageBucket: "flutter-damda-gallery2.appspot.com",
  messagingSenderId: "162221939537",
  appId: "1:162221939537:web:c562287111d83a3d34d170",
  measurementId: "G-NLZJM75QCF",
};

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const storage = getStorage();
const db = getFirestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { storage, db };
