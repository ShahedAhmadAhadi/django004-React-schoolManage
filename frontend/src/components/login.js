import React, { useState, useEffect } from "react";
import { Redirect, Route, useHistory, Link } from "react-router-dom";
// import moduleName from 'module'
import Data from "./index";
import App from "../App";
import Alert from "./alerts";

function Login() {
    let history = useHistory();
    const [login, setLogin] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [emptyAlert, setEmptyAlert] = useState(false);
    const [message, setMessage] = useState("");

    const [IP, setIP] = useState("");

    useEffect(() => {
        fetch("https://json.geoiplookup.io/")
            .then((response) => response.json())
            .then((res) => setIP(res.ip));
    }, []);

    const browserDetails = window.navigator.appVersion;
    console.log(browserDetails);

    // console.log(IP)
    let showAlert = () => {
        setEmptyAlert(!emptyAlert);
    };
    let check = async function (username, password) {
        // if (username == "" || password == "") {
        //     setMessage("empty");
        //     showAlert();
        // } else 
        if (IP) {
            const request = new Request("http://localhost:8000/login/", {
                headers: { "Content-type": "application/json" },
            });
            fetch(request, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    ip: IP,
                    appVersion: browserDetails,
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.result) {
                        document.cookie = `token=`;
                        document.cookie = `username=`;
                        document.cookie = `ip=`;
                        alert("Wrong specifications");
                    } else {
                        document.cookie = `token=${res.token}`;
                        document.cookie = `username=${username}`;
                        document.cookie = `ip=${IP}`;
                        look();
                    }
                });

            // .catch(error => console.log(error))
        }
    };
    let look = function () {
        if (document.cookie) {
            history.push("/");
            window.location.reload();
            // <Data />
            // console.log(document.cookie)
        }
    };

    return (
        <div className="bg-gray-100 fixed w-full h-full flex justify-center items-center">
            <div className="flex flex-col w-1/3 bg-white p-10 rounded">
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                />
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full border-b border-green-400 py-1 my-2 px-3 focus:outline-none"
                />
                <a
                    href="#"
                    onClick={() => check(username, password)}
                    className="w-1/3 text-white py-1 my-4 px-2 bg-green-600 rounded text-center m-auto font-semibold"
                >
                    Submit
                </a>
                <p className="text-center mt-2">
                    or create acount,{" "}
                    <Link to="/signup" className="text-blue-600 font-bold">
                        SignUP
                    </Link>
                </p>
            </div>
            {emptyAlert && (
                <Alert errorFor={message} visible={() => showAlert()}></Alert>
            )}
        </div>
    );
}

export default Login;
