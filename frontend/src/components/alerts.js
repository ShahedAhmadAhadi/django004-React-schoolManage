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
        <div className="bg-black bg-opacity-30 absolute inset-0 flex justify-center items-center">
            <div className="bg-white rounded w-1/3 p-5 shadow-lg">
                <div className="flex justify-between pb-2 border-b-2 border-red-400">
                    <h1 className="font-bold text-2xl pl-4">Alert!</h1>
                    <a href="#" className="font-bold text-2xl">&times;</a>
                </div>
                <p className="pt-2 pl-4">{message}</p>
            </div>
        </div>
    )
}

export default Alert
