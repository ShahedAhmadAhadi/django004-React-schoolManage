import React, { useState } from 'react'


function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const passwordConfirm = () => {
        if (password1 === password2) {
            return true
        }
    }

    let sign = async function () {

        if (!passwordConfirm()) {
            alert('please enter same password')
            return false
        }
        
        const request = new Request('http://localhost:8000/signup/', {headers: {'Content-type': 'application/json'}})
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password1,
                    password2: password2
                }),
            })
            .then(response => response.json()).then(res => console.log(res))
    }


    return (
        <div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="UserName" required minLength="8" />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="E-mail" required minLength="8" />
            <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}  placeholder="Password" required minLength="8" />
            <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  placeholder="Confirm" required minLength="8" />
            <button type="submit" onClick={(e) => {sign(e.stopPropagation())}}>Submit</button>
            
        </div>
    )
}

export default Signup
