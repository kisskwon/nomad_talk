import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import chicken from "../assets/audio/chicken.mp3";
import newNoti from "../assets/audio/new_noti.mp3";
import order from "../assets/audio/order.mp3";
import skiTrip from "../assets/audio/ski_trip.mp3";
import sorryDaddy from "../assets/audio/sorry_daddy.mp3";
import youtube from "../assets/audio/youtube.mp3";

function TTSGoogleNode(props) {
  const { from, message } = props.text;
  const [audioSource, setAudioSource] = useState("");
  const [audioText, setAudioText] = useState("오디오 대기중");

  const requestAudioFile = useCallback(
    async (text) => {
      let stream;
      if (message === "아빠!\n지난 주말에는 미안했어~\n사랑해!") {
        stream = sorryDaddy;
      } else if (
        message === "엄마!\n지난 겨울에 애들과 스키장 다녀온 사진이예요"
      ) {
        stream = skiTrip;
      } else if (message === "이걸로 결정했어! 주문하면 이번주 안에는 올까?") {
        stream = order;
      } else if (message === "7시에는 도착해요. 치킨 사가지고 갈게요.") {
        stream = chicken;
      } else if (
        message ===
        "엄마가 좋아하는 송강호 배우 나온데요.\n개봉하면 같이 보러 가요~"
      ) {
        stream = youtube;
      } else if (message === "새로운 알림이 도착했어요.") {
        stream = newNoti;
      }

      let response;
      if (stream) {
        response = await axios.get(stream, {
          responseType: "arraybuffer",
        });
      } else {
        // response = await axios.post(
        //   "http://10.158.2.146:5000/tts",
        //   {
        //     text: text,
        //     language: "ko-KR",
        //     gender: "FEMALE",
        //     },
        //     {
        //       responseType: "arraybuffer",
        //   }
        // );
        const getFile = await axios.post(
          "https://1c1i5h92w9.execute-api.ap-northeast-2.amazonaws.com/tts",
          {
            text: text.replace("~", " "),
            language: "ko-KR",
            gender: "FEMALE",
          }
        );
        console.log("kks", "post response", getFile);
        response = await axios.get(getFile.data.Location, {
          responseType: "arraybuffer",
        });
      }

      const audioContext = new AudioContext();
      // makeAudio(response)
      const audioBuffer = await audioContext.decodeAudioData(response.data);
      //create audio source
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start();

      console.log("source", source);
      setAudioSource(source);
      setAudioText("Text Ready");
    },
    [message]
  );

  useEffect(() => {
    if (["none", "(동영상)"].includes(message)) {
      requestAudioFile("새로운 알림이 도착했어요.");
    } else if (from && message) {
      requestAudioFile(from + "님에게서 메세지가 도착했습니다. " + message);
    } else if (message) {
      requestAudioFile("새로운 알림이 도착했어요." + (message || ""));
    }
  }, [requestAudioFile, message, from]);

  return (
    <>
      <audio>
        <source type="audio/mp3" src={audioSource} />
      </audio>
      <div>{audioText}</div>
    </>
  );
}

export default TTSGoogleNode;
