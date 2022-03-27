import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import styled from "styled-components";

const WebcamHolder = styled.div`
  canvas {
    border: 7px solid black;
  }
`;

const VID_QUALITY = 20;

const videoConstraints = {
  height: VID_QUALITY,
};

export default function Camera() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  function drawImage() {
    const video = webcamRef.current;
    const canvas = canvasRef.current;
    const pixels = window.pixelsJS;


    if (video && canvas && pixels) {
      var ctx = canvas.getContext("2d");

      canvas.width = video.video.videoWidth;
      canvas.height = video.video.videoHeight;

      ctx.imageSmoothingEnabled = false;

      // We want also the canvas to display de image mirrored
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video.video, 0, 0, canvas.width, canvas.height);
      ctx.scale(-1, 1);
      ctx.translate(-canvas.width, 0);


      var imageData = ctx.getImageData(0, 0, 300, 300);
      var newImgData = pixels.filterImgData(imageData, "neue");
      ctx.putImageData(newImgData, 0, 0);
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      drawImage();
    }, 30);
    return () => clearInterval(timer);
  }, [webcamRef, canvasRef])

  return (
    <WebcamHolder>
      <Webcam videoConstraints={videoConstraints} height={0} ref={webcamRef} />
      <canvas ref={canvasRef} style={{ height: 300, width: 300 }} />
    </WebcamHolder>
  );
}