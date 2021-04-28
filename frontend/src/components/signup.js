import React, { useState, useEffect } from 'react'
import {useHistory, Link} from 'react-router-dom'
import Alert from './alerts'


function Signup() {

    const history = useHistory()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [messagePanel, setMessagePanel] = useState(false)
    const [errorAlert, setErrorAlert] = useState('')

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
            let data = await fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password1: password1,
                }),
            })
            let response = await data.json()
            if (response.result == 'success') {
                history.push('/login')
            }
            showPanel(response.result)
    }
    let showPanel = (result) => {
        if (result == 'username') {
            setErrorAlert('username')
            setMessagePanel(true)
            console.log('object')
        } else if (result == 'email') {
            setErrorAlert('email')
            setMessagePanel(!messagePanel)}
        else{
            setErrorAlert(false)
            setMessagePanel(!messagePanel)
        }
    }


    return (
        <div className="bg-gray-100 fixed w-full h-full flex justify-center items-center">
            <div className="flex flex-col w-1/3 bg-white p-10 rounded">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  placeholder="UserName" required className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="E-mail" required className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)}  placeholder="Password" required className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}  placeholder="Confirm" required className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <button type="submit" onClick={(e) => {sign()}} className="w-1/3 text-white py-1 my-4 px-2 bg-green-600 rounded text-center m-auto font-semibold">Submit</button>
                <p className="text-center mt-2">
                    already have an acount?{" "}
                    <Link to="/login" className="text-blue-600 font-bold">
                        Log In
                    </Link>
                </p>
            </div>
            {messagePanel && <Alert visible={showPanel} errorFor={errorAlert} ></Alert>}
        </div>
    )
}

export default Signup
