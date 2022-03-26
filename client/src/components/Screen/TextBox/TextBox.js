import React, { useEffect, useState } from 'react';
import RecordRTC from 'recordrtc';

export default function TextBox({recording}){
    const [socket, setSocket] = useState();
    const [recorder, setRecorder] = useState();

    useEffect(() => {
        const data = fetch('/').then(res => res.json());

        if(data.error){
            alert(data.error);
            console.error(data.error);
            return;
        }

        const {token} = data;

        // set up web socket with assembly ai for real time transcribing
        const socket = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`);

        setSocket(socket);

    }, []);

    useEffect(() => {
        if(recording){
            navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          recorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
            timeSlice: 250, // set 250 ms intervals of data that sends to AAI
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // real-time requires only one channel
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;

                // audio data must be sent as a base64 encoded string
                if (socket) {
                  socket.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                }
              };
              reader.readAsDataURL(blob);
            },
          });

          recorder.startRecording();
          setRecorder(recorder);
        })
        .catch((err) => console.error(err));
            
            recorder.startRecording();
        }
    }, [recording]);

    return (
        <div>
            TEXT BOX
        </div>
    );
}