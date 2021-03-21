import React, { useState, useEffect } from 'react'
import { Redirect, Route, useHistory, Link } from 'react-router-dom';
// import moduleName from 'module'
import Data from './index'
import App from '../App'



function Login() {
    let history= useHistory()
    const [login, setLogin] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const [IP, setIP] = useState('')

    useEffect(() => {
        fetch('https://json.geoiplookup.io/').then(response => response.json()).then(res => setIP(res.ip))
    }, [])

    const browserDetails = window.navigator.appVersion
    console.log(browserDetails)

    console.log(IP)
    let check = async function (username, password) {
        if (IP) {
            const request = new Request('http://localhost:8000/login/', {headers: {'Content-type': 'application/json',}})
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    ip : IP,
                    appVersion: browserDetails
                }),
            })
            .then(response => response.json())
            .then(res => {if (res.result) {
                            document.cookie = `token=`;
                            document.cookie = `username=`;
                            document.cookie = `ip=`;
                            alert('Wrong specifications')
                        } else {
                            document.cookie = `token=${res.token}`;
                          document.cookie = `username=${username}`;
                          document.cookie = `ip=${IP}`;
                          look()
                        }})
                
            // .catch(error => console.log(error))
        }
    }
    let look = function () {
        if(document.cookie){
            history.push('/index');
            window.location.reload()
            // <Data />
            // console.log(document.cookie)
        }
        }

         
    
    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
            <a onClick={() =>check(username, password)}>submit</a>
            <p>
                or create acount, <Link to="/signup">signUP</Link>
            </p>
        </div>
    )
}

export default Login
