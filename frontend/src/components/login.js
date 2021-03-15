import React, { useState } from 'react'

function Login() {
    const [login, setLogin] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    console.log(username, password);
    return (
        <div>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username"/>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
        </div>
    )
}

export default Login
