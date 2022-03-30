import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

function TTSGoogleNode(props) {
  const [audioSource, setAudioSource] = useState("");
  const [audioText, setAudioText] = useState("오디오 대기중");

  const requestAudioFile = useCallback(async (text) => {
    console.log("request Audio");

    const response = await axios.post(
      "http://10.158.2.146:5000/tts",
      {
        text: text,
        gender: "FEMALE",
      },
      {
        responseType: "arraybuffer",
      }
    );

    console.log("response", response);

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
    setAudioText("Text준비완료");
  }, []);

  useEffect(() => {
    if (props.text) {
      console.log("kks", "TTS START");
      requestAudioFile(props.text);
    }
  }, [requestAudioFile, props.text]);

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
