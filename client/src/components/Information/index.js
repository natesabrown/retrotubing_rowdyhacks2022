import React from 'react';
import './style.css';

function Information() {
  return (
      
    
        <div className="wrapper">
            
            <div className="box a">
                
                <h1>Easy to Setup</h1>
                <div style={{
                    borderTop: "2px solid black"
                }}>

                </div>
                <p> Simply allow chrome access to your camera and mic,
                    click the red record button, record yourself, and download
                    the recording to share!

                </p>
            </div>
            <div className="box b">
                <h1>Pixelize Yourself</h1>
                <div style={{
                    borderTop: "2px solid black"
                }}></div>
                <p> Our service will pixelize your both video and chat
                     LIVE, allowing you to monitor the video as you record! </p>
                </div>
            <div className="box c">
                <h1>Keep Anonymous</h1>
                <div style={{
                    borderTop: "2px solid black"
                }}></div>
                <p>Share your message through a retro character and chat, 
                    allowing you to keep your identity secret for personal 
                    or safety reasons!
                </p>
                </div>
        </div>

  )
}




export default Information;