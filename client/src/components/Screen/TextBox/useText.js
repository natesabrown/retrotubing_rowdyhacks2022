import { useState, useEffect } from "react";
import RecordRTC from 'recordrtc';

export default function useText(recording){
    const [socket, setSocket] = useState();
    const [recorder, setRecorder] = useState();
    const [token, setToken] = useState();
    const [text, setText] = useState(['', '']);

    useEffect(() => {
        if(recording){
            (async () => {
                let apiToken = token || await fetch('http://localhost:9000')
                    .then(res => res.json())
                    .then(token => {
                        setToken(token);
                        return token;
                    });

                // set up web socket with assembly ai for real time transcribing
                const socket = new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${apiToken}`);
                
                console.log('session setting up');
                // incoming messages from socket
                const texts = {};
                socket.onmessage = message => {
                    console.log('message received');
                    let msg1 = '';
                    let msg2= '';
                    const res = JSON.parse(message.data);
                    texts[res.audio_start] = res.text;
                    const keys = Object.keys(texts);
                    keys.sort((a, b) => a - b);
                    for (const key of keys) {
                        console.log(key);
                        if (texts[key]) {
                            if((msg1 + texts[key]).length > 25){
                                if((msg2 + texts[key]).length > 25){
                                    msg1 = texts[key];
                                    msg2 = '';
                                } else{
                                    msg2 += ` ${texts[key]}`;
                                }
                            } else
                                msg1 += ` ${texts[key]}`;
                            
                        }
                    }
                    console.log(msg1);
                    setText([msg1, msg2]);
                }

                socket.onerror = e => {
                    console.error(e);
                    socket.close();
                }

                socket.onclose = e => {
                    console.log(e);
                    setSocket(null);
                }

                socket.onopen = () => {
                    console.log('socket opened');
                    // once socket is open, begin recording
                    navigator.mediaDevices.getUserMedia({ audio: true })
                        .then((stream) => {
                            const recorder = new RecordRTC(stream, {
                                type: 'audio',
                                mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
                                timeSlice: 250, // set 250 ms intervals of data that sends to AAI
                                desiredSampRate: 16000,
                                numberOfAudioChannels: 1, // real-time requires only one channel
                                bufferSize: 4096,
                                audioBitsPerSecond: 128000,
                                recorderType: RecordRTC.StereoAudioRecorder,
                                ondataavailable: (blob) => {
                                    const reader = new FileReader();
                                    reader.onload = () => {
                                    const base64data = reader.result;
                                    console.log(socket);
                                    // audio data must be sent as a base64 encded string
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
                };

                console.log(socket);
                setSocket(socket);
            })();
        } else{
            console.log(socket);
            if(socket){
                console.log('socket close');
                // socket.send(JSON.stringify({terminate_sessin: true}));
                socket.close();
            }
            if(recorder){
                console.log('paused recording');
                recorder.pauseRecording();
                setRecorder(null);
            }
        }
    }, [recording]);

    return text;
}