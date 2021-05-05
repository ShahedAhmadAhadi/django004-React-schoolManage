import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Alert from "./alerts";

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
    const [fatherName, setFatherName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [wrongAge, setWrongAge] = useState(false);
    const [phoneConflict, setPhoneConflict] = useState(false);
    const [emailConflict, setEmailConflict] = useState(false);
    const [wrongEmail, setWrongEmail] = useState(false);
    const [messagePanel, setMessagePanel] = useState(false);
    const [typeOfError, setTypeOfError] = useState("");
    // const [authenticated, setAuthentication] = useState(false)
    // const a = document.forms.namedItem('file')
    // console.log(file)

    // let as = function (e) {
    //     console.log(e)
    //  }
    let history = useHistory();

    let formData = async function () {
        const formData = new FormData();
        console.log(name);
        formData.append("name", name);
        formData.append("fatherName", fatherName);
        formData.append("date", date);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("myFile", file);

        if (name && fatherName && date && email && phone && file) {
            const verifyRequest = new Request(
                "http://localhost:8000/add/"
            );
            fetch(verifyRequest, {
                headers: {
                    Head: document.cookie,
                },
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (res.result === "wrong_age") {
                        setWrongAge(true);
                        setEmailConflict(false);
                        setPhoneConflict(false);
                        setWrongEmail(false);
                    } else if (res.result === "phone") {
                        setWrongAge(false);
                        setEmailConflict(false);
                        setPhoneConflict(true);
                        setWrongEmail(false);
                    } else if (res.result === "email") {
                        setWrongAge(false);
                        setPhoneConflict(false);
                        setEmailConflict(true);
                        setWrongEmail(false);
                    } else if (res.result === "wrong_email") {
                        setEmailConflict(false);
                        setWrongAge(false);
                        setPhoneConflict(false);
                        setWrongEmail(true);
                    } else if (res.result === 'true') {
                        setEmailConflict(false);
                        setWrongAge(false);
                        setPhoneConflict(false);
                        setWrongEmail(false);
                        window.location.reload();
                    } else {
                            history.push("/login");
                        }})
        } else {
            setTypeOfError("empty");
            showAlert();
        }

        // console.log(file)
        console.log(formData);
    };

    let showAlert = () => {
        setMessagePanel(!messagePanel);
    };
    let errorStyles = "text-xs text-red-500";
    console.log(prop);
    return (
        <div className="w-1/3 bg-white rounded">
            <form encType="multipart/form-data" className="flex flex-col m-10">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                    placeholder="Name"
                />
                <input
                    type="text"
                    value={fatherName}
                    onChange={(e) => setFatherName(e.target.value)}
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                    placeholder="Father Name"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                />
                {wrongAge && (
                    <p className={errorStyles}>
                        *A student must be at least 5 years old
                    </p>
                )}
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                    placeholder="Phone"
                />
                {phoneConflict && (
                    <p className={errorStyles}>*This phone number is used</p>
                )}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                    placeholder="E-mail"
                />
                {emailConflict && (
                    <p className={errorStyles}>*This email is used</p>
                )}
                {wrongEmail && (
                    <p className={errorStyles}>*Please, Enter a valid Email</p>
                )}
                {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} /> */}
                <input
                    type="file"
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <span className="flex justify-around text-center">
                    <button
                        onClick={(e) => formData(e.preventDefault())}
                        className="w-1/3 text-white py-1 my-2 px-3 bg-green-600 rounded"
                    >
                        Submit
                    </button>
                    <a
                        href="#"
                        onClick={() => prop.visible()}
                        className="w-1/3 text-white py-1 my-2 px-3 bg-red-600 rounded"
                    >
                        Back
                    </a>
                </span>
            </form>
            {messagePanel && (
                <Alert visible={showAlert} errorFor={typeOfError} />
            )}
        </div>
    );
}

export default AddStudent;
