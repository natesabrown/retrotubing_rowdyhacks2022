import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";
import useText from "../Screen/TextBox/useText";
import speechBubblePath from './speech_bubble.png';

const speechBubble = new Image();
speechBubble.src = speechBubblePath;

console.log(speechBubble);

const WebcamHolder = styled.div`
  canvas {
    width: 500px;
    height: 500px;
  }
`;

const VID_QUALITY = 20;

const videoConstraints = {
  width: VID_QUALITY,
  height: VID_QUALITY,
};

function Camera({ recording, filterName }) {
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
      var newImgData = pixels.filterImgData(imageData, "neue");
      ctx.putImageData(newImgData, x, y);
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      drawImage();
    }, 30);
    return () => clearInterval(timer);
  }, [webcamRef, canvasRef, filterName, text])

  return (
    <WebcamHolder>
      <Webcam videoConstraints={videoConstraints} height={0} ref={webcamRef} />
      <canvas ref={canvasRef} />
    </WebcamHolder>
  );
}

export default Camera;
