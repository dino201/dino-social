import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";


import "./chatVideo.scss";


function ChatVideo({ socket, setShowVideoCall, currentChat }) {

    const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
    const [peerId, setPeerId] = useState('');

    const peerInstance = useRef(null)
    const currentUserVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    useEffect(() => {

        const peer = new Peer(socket.current.id);
        peer.on('open', (id) => {
            setPeerId(id);
        });
        peer.on('call', (call) => {
            var getUserMedia = navigator.getUserMedia || navigator.webkitGeUserMedia || navigator.mozGeUserMedia;
            getUserMedia({ video: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                remoteVideoRef.current.play()
                call.answer(mediaStream)
                call.on('stream', (remoteStream) => {
                    remoteVideoRef.current.srcObject = remoteStream;
                    remoteVideoRef.current.play()
                })
            })
        })

        peerInstance.current = peer;
    }, [])

    const call = (remotePeerId) => {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGeUserMedia || navigator.mozGeUserMedia;

        getUserMedia({ video: true }, (mediaStream) => {
            currentUserVideoRef.current.srcObject = mediaStream;
            remoteVideoRef.current.play()
            const call = peerInstance.current.call(remotePeerId, mediaStream)

            call.on('stream', (remoteStream) => {
                remoteVideoRef.current.srcObject = remoteStream;
                remoteVideoRef.current.play()
            })
        })
    }


    const handleClose = () => {
        setShowVideoCall(false);
    }
    return (
        <div className="video-chat">
            <div className="container">
                <div className="video-container">
                    <div className="video-title">
                        <h1>Chat video call</h1>
                        <button onClick={handleClose}>close</button>
                    </div>
                    <div >
                        <span>{peerId}</span>
                        <br></br>
                        <input type="text" value={remotePeerIdValue} onChange={(e) => setRemotePeerIdValue(e.target.value)} />
                        <button onClick={() => call(remotePeerIdValue)}>Call</button>

                    </div>
                    <div className="my-video">
                        <video playsInline muted ref={currentUserVideoRef} autoPlay style={{ width: "300px" }} />
                    </div>
                    <div className="user-video">
                        <video playsInline ref={remoteVideoRef} autoPlay style={{ width: "300px" }} />
                    </div>
                </div>


            </div>
        </div>
    )

}


export default ChatVideo;
