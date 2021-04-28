import React, {useState, useEffect} from 'react'

function Alert(props) {
    console.log(props)
    const [message, setMessage] = useState('')
    useEffect(() => {
        if (props.errorFor == 'username') {
            setMessage('This username already exists please, Enter a new one!')
        }
         else if (props.errorFor == 'email'){
            setMessage('This email is in use of another acount choose another email, Please!')
        }
    }, [])
    

    return (
        <div className="bg-black bg-opacity-30 absolute inset-0">
            <div className="bg-white rounded w-1/3">
                <div>
                    <h1>Alert</h1>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Alert
