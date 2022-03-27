import React, { useRef, useEffect, useCallback, useState } from "react";
import Webcam from "react-webcam";
import styled, { keyframes, css } from "styled-components";
import useText from "../Screen/TextBox/useText";
import speechBubblePath from './speech_bubble.png';
import recorder from 'react-canvas-recorder';
import play from '../Screen/play.png';
import stop from '../Screen/stop.png';

const speechBubble = new Image();
speechBubble.src = speechBubblePath;

console.log(speechBubble);

const WebcamHolder = styled.div`
  canvas {
    width: 500px;
    height: 500px;
  }
`;

const bubble = keyframes`
  0% {
    transform: translateY(0px);
  } 
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
`

const PlayButton = styled.div`
  position: absolute;
  bottom: 5px;
  left: 230px;

  img {
    width: 70px;
    image-rendering: pixelated;
  }

  &:hover {
    cursor: pointer;

    ${props => !props.recording && css`img {
      animation: ${bubble} 0.5s infinite;
    }`}
  }
`

const VID_QUALITY = 5;

const videoConstraints = {
  width: VID_QUALITY,
  height: VID_QUALITY,
};

function Camera({ setFile, filterName }) {
  const [recording, setRecording] = useState(false);

  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const text = useText(recording);

  function drawImage() {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const pixels = window.pixelsJS;

    if (video && canvas && pixels) {
      var ctx = canvas.getContext("2d");

      ctx.drawImage(speechBubble, 10, 5, 280, 45);

      ctx.font = "12px VT323 monospace";
      ctx.fillText(text[0], 30, 20, 230);
      ctx.fillText(text[1], 30, 32.5, 230);

      const x = 80, y = 55, w = 140, h = 70;

      ctx.imageSmoothingEnabled = false;

      // video border
      ctx.rect(x, y, w, h);
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'black';
      ctx.stroke();

      // We want also the canvas to display de image mirrored
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video.video, x, y, w, h);
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);
      

      var imageData = ctx.getImageData(x, y, w, h);
      var newImgData = pixels.filterImgData(imageData, filterName);
      ctx.putImageData(newImgData, x, y);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      drawImage();
    }, 30);
    return () => clearInterval(timer);
  }, [webcamRef, canvasRef, filterName, text])

  const startRecording = useCallback(() => {
    recorder.createStream(canvasRef.current);
    recorder.start();
  }, [canvasRef]);

  const stopRecording = useCallback(() => {
    if(setFile){
      recorder.stop();
      const file = recorder.save();
      const url = window.URL.createObjectURL(file);

      setFile(url);
    }
  }, [setFile]);

  return (
    <WebcamHolder>
      <Webcam videoConstraints={videoConstraints} height={0} ref={webcamRef} />
      <canvas ref={canvasRef} />
      <PlayButton onClick={() => {
          if(recording)
            stopRecording();
          else
            startRecording();

          setRecording(!recording);
        }} recording={recording}>
        <img src={recording ? stop : play} />
      </PlayButton>
    </WebcamHolder>
  );
}

export default Camera;
