import React, {useState} from 'react'


// function getCookie(name) {
//     let cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         const cookies = document.cookie.split(';');
//         for (let i = 0; i < cookies.length; i++) {
//             const cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }
// const csrftoken = getCookie('csrftoken');








function AddStudent(prop) {
    const [fatherName, setFatherName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [email, setEmail] = useState('')
    const [file, setFile] = useState(null)
    const [name, setName] = useState('')

let formData = async function (name, fatherName, date, phone, email, file) {
    
    const formData = new FormData(file)

    formData.append(
        "myFile",
        file,
        file.name
    );

    console.log(file)
    console.log(formData)

    const request = new Request('http://localhost:8000/add/', {headers: {'Content-type': 'application/json',}})
    fetch(request, {
        method: "POST",
        //  mode: 'same-origin',
        // headers: {
        //     'Content-type': 'application/json',
        //     'X-CSRFToken' : csrftoken,
        // },
        body: JSON.stringify({
            name: name,
            fatherName: fatherName,
            date: date,
            phone: phone,
            email: email,
            file: formData,
        }),
    })
    
}



    console.log(prop.visible)
    if (prop.visible == 'grid') {
        // formData()
    }
    return (
        <div className="mb-10">

            <form>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Name"/>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Father Name"/>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Phone"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "E-mail"/>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                <button onClick={(e) => formData(name, fatherName, date, phone, email, file, e.preventDefault())}>Submit</button>
            </form>
        </div>
    )
}

export default AddStudent
