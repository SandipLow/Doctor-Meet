import React, { useContext, useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/auth'
import Socket from '../hooks/socket'


const Join = () => {

    const logInFormRef = useRef()
    const {user, signIn} = useContext(AuthContext)
    const navigate = useNavigate()
    const socket = Socket()
    const [doctors, setDoctors] = useState([])

    useEffect(()=> {
        socket.emit('get-rooms', (rooms)=> {
            setDoctors(rooms.map(e=><option key={e.peerId} value={e.peerId}>{e.username}</option>))
        })

        socket.on('doctor-list', (rooms)=> {
            console.log(rooms);
            setDoctors(rooms.map(e=><option key={e.peerId} value={e.peerId}>{e.username}</option>))
        })
    }, [])

    const call = ()=> {
        const peerId = document.getElementById('doctor').value
        console.log(peerId);
        navigate('/meet?id='+peerId)
    }
    
    const logIn = (e)=> {
        e.preventDefault();
        
        let email = logInFormRef.current.login_id.value;
        let password = logInFormRef.current.password.value;

        let res = signIn(email, password);

        if (res == "Success") {
            navigate('/meet')
        }

        alert(res)
    }

    return (
        <>
        <p>Meet or Log in...</p>
        <select name="doctor" id="doctor">
            {doctors}
        </select>
        <button onClick={call}>Meet With Doctor</button><br /><br />

        <p>Or,</p>

        <form ref={logInFormRef}>
            <label htmlFor="login_id">
                <span>Log In :</span>
            </label>
            <input type="text" name='login_id' id='login_id' /><br />
            <label htmlFor="password">
                <span>Password :</span>
            </label>
            <input type="password" name="password" id="password" /><br />
            <button onClick={logIn}>Log in as Doctor</button>
        </form>
        </>
    )
}

export default Join