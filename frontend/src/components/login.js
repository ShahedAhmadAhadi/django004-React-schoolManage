import React, { useState, useEffect } from 'react'



function Login() {

    const [login, setLogin] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log(username, password, login);

    // useEffect(() => {
    //     async function check() { 
    //         fetch('localhost:8000/login', {headers: {'Content-type': 'application/json',},
    //             method: 'POST', body: JSON.stringify({username: username, password: password})})
    //      }
    // }, [login])


    // let check = async function() { 
    //         fetch('localhost:8000/login', {headers: {'Content-type': 'application/json',},
    //             method: 'POST', body: JSON.stringify({username: username, password: password})})
    //      }

         let check = async function (username, password) { 
            const request = new Request('http://localhost:8000/login/', {headers: {'Content-type': 'application/json',}})
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            })
        
        }
    
    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
            <button onClick={() =>check(username, password)}>submit</button>
        </div>
    )
}

export default Login
