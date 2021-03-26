import React, {useState, useEffect} from 'react'

function Update(prop) {

    const [fatherName, setFatherName] = useState(prop.data[0].fields.s_father_name)
    const [phone, setPhone] = useState(prop.data[0].fields.s_phone)
    const [date, setDate] = useState(prop.data[0].fields.s_birth)
    const [email, setEmail] = useState(prop.data[0].fields.s_email)
    const [file, setFile] = useState(prop.data[0].fields.s_image.name)
    const [name, setName] = useState(prop.data[0].fields.s_name)
    console.log(prop.data[0].fields.s_image)

    // let formData = async function () {
    //     const formData = new FormData()
    //     console.log(name)
    //     formData.append("name", name)
    //     formData.append("fatherName", fatherName)
    //     formData.append("date", date)
    //     formData.append("email", email)
    //     formData.append("phone", phone)
    //     formData.append("myFile", file);
    
    //     console.log(formData)
    
    //     const request = new Request('http://localhost:8000/add/')
    //     fetch(request, {
    //         headers: {
    //             'Head': document.cookie,
    //         },
    //         method: "POST",
    //         body: formData,
    //     })
    //     .then(response => response.json())
    //     .then(res => {
    //         if (res.result == 'true') {
    //           window.location.reload()
    //         }else{
    //           history.push('/login')
    //         }}
    //       )
    // }

    return (
        <div className="w-1/3 bg-white rounded">

            <form encType="multipart/form-data" className="flex flex-col m-10">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Name"/>
                <input type="text" value={fatherName} onChange={(e) => setFatherName(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Father Name"/>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"/>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "Phone"/>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" placeholder= "E-mail"/>
                <input type="file" className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none" onChange={(e) => setFile(e.target.files[0])} />
                <span className="flex justify-around">
                    {/* <button onClick={(e) => formData(e.preventDefault())} className="w-1/3 text-white py-1 my-2 px-3 bg-green-600 rounded">Submit</button> */}
                    <a href="#" onClick={() => prop.visible()} className="w-1/3 text-white py-1 my-2 px-3 bg-red-600 rounded">Back</a>
                </span>
            </form>
        </div>
    )
}

export default Update
