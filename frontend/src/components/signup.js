import React, { useState } from 'react'
import AddStudent from './addStudent'

function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    let sign = async function () {
        const request = new Request('http://localhost:8000/signup/', {headers: {'Content-type': 'application/json'}})
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    a: 'a'
                }),
            })
            .then(response => response.json()).then(res => console.log(res))
    }


    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="UserName" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="E-mail" />
            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}  placeholder="Password" />
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  placeholder="Confirm" />
            <button type="submit" onClick={() => {sign()}}>Submit</button>
        </div>
    )
}

export default Signup
