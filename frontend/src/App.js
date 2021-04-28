import logo from "./logo.svg";
import { useState, useEffect } from "react";
import Data from "./components/index";
import { Route, Redirect, useHistory } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
    console.log("App component");
    const [authenticated, setAuthentication] = useState(false);

    let history = useHistory();

    useEffect(() => {
            (async function verify() {
                fetch("http://localhost:8000/verify/", {
                    headers: { "Content-type": "application/json" },
                    method: "POST",
                    body: document.cookie,
                })
                    // .catch(history.push('/login'))
                    .then((response) => response.json())
                    .then((res) => {
                        console.log(res, res.result);
                        if (res.result == "true") {
                            setAuthentication(true);
                            console.log("token");
                        } else if (
                            res.result == "missing_field_in_cookie" ||
                            res.result == "not_valid_user" ||
                            res.result == "wrong_token"
                        ) {
                            console.log(res.result);
                            setAuthentication(false);
                            history.push("/login");
                            alert("You should SignIn again");
                        } else if (res.result == "no_cookie") {
                            setAuthentication(false);
                            history.push("/login");
                        } else {
                            setAuthentication(false);
                            history.push("/login");
                            alert("Your session has ended, SignIn again");
                        }
                        console.log(authenticated, "a");
                    });
            })();
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {authenticated && (
                    <Route exact path="/" component={Data}>
                        {/* {authenticated && history.push('/')} */}
                    </Route>
                )}
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/signup" component={Signup}></Route>
            </header>
        </div>
    );
}

export default App;
