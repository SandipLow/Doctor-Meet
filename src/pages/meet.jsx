import Peer from 'peerjs';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import Socket from '../hooks/socket';

const Meet = () => {
    const [peer, setPeer] = useState(null)
    const { user, signOut } = useContext(AuthContext);
    const socket = Socket()
    const [params, setParams] = useSearchParams()
    const navigate = useNavigate()
    const currentUserVideoRef = useRef()
    const remoteVideoRef = useRef()
    // for patients: the peerId of doctor they meet..
    const [doctorId, setDoctorId] = useState(null)

    useEffect(() => {
        let myPeer = new Peer()

        myPeer.on('open', id => {

            setPeer(myPeer)

            // say everyone that this doctor joined
            if (user) {
                socket.emit('doctor-joined', id, user, (res) => {
                    if (res != "Success") alert(res)
                })
            }
            
            // if patient call the doctor he want to meet
            else {
                const peerId = params.get('id')
                if (!peerId) navigate('/')
                setDoctorId(peerId)
                var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                getUserMedia({ video: true, audio: true }, (mediaStream) => {

                    currentUserVideoRef.current.srcObject = mediaStream;
                    currentUserVideoRef.current.play();
                    currentUserVideoRef.current.muted = true;

                    const call = myPeer.call(peerId, mediaStream)

                    call.on('stream', (remoteStream) => {
                        remoteVideoRef.current.srcObject = remoteStream
                        remoteVideoRef.current.play();
                    });
                });
            }

        })

        // Recieve call code
        myPeer.on('call', (call) => {
            alert('someOne calling...')
            var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

            getUserMedia({ video: true, audio: true }, (mediaStream) => {
                currentUserVideoRef.current.srcObject = mediaStream;
                currentUserVideoRef.current.play();
                currentUserVideoRef.current.muted = true;

                call.answer(mediaStream)
                call.on('stream', function (remoteStream) {
                    remoteVideoRef.current.srcObject = remoteStream
                    remoteVideoRef.current.play();
                });
            });
        })

        return () => {
            if (user) {
                socket.emit('doctor-left', myPeer.id)
                signOut()
            }
            myPeer.disconnect()
        }

    }, [])

    return (
        <>
        <div>Your Call Id (for reference) : {peer ? peer.id : 'joining...'}</div>
        <p>{doctorId ? `Calling doctor : ${doctorId}` : ""}</p>
        <div>
            <video ref={currentUserVideoRef} />
        </div>
        <div>
            <video ref={remoteVideoRef} />
        </div>
        </>
    )
}

export default Meet