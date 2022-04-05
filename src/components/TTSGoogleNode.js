import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import babyhouse from "../audio/babyhouse.mp3";
import taekwon from "../audio/taekwon.mp3";

function TTSGoogleNode(props) {
  const { from, message } = props.text;
  const [audioSource, setAudioSource] = useState("");
  const [audioText, setAudioText] = useState("오디오 대기중");

  const requestAudioFile = useCallback(
    async (text) => {
      console.log("request Audio");
      let stream;
      if (message === "오늘 이준이 태권도 금메달 땄어요 (사진)") {
        stream = taekwon;
      } else if (message === "서준이 어린이집 첫 등원했어요 (사진)") {
        stream = babyhouse;
      }

      let response;
      if (stream) {
        response = await axios.get(
          text.includes("태권도") ? taekwon : babyhouse,
          {
            responseType: "arraybuffer",
          }
        );
      } else {
        response = await axios.post(
          "http://10.158.2.146:5000/tts",
          {
            text: text,
            language: "ko-KR",
            gender: "FEMALE",
          },
          {
            responseType: "arraybuffer",
          }
        );
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
    if (message) {
      requestAudioFile(from + "님에게서 메세지가 도착했습니다. " + message);
    }
  }, [requestAudioFile, message, from]);

  return (
    <>
      <audio>
        <source type="audio/mpeg" src={audioSource} />
      </audio>
      <div>{audioText}</div>
    </>
  );
}

export default TTSGoogleNode;
