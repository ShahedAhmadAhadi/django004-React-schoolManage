import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import Data from './components/index'
import { Route, Redirect, useHistory } from 'react-router-dom'
import Login from './components/login'


  function App() {
    const [authenticated, setAuthentication] = useState(false)

    let history = useHistory()

    useEffect(() => {
      (async function verify () {
        fetch('http://localhost:8000/verify/',
         {headers: {'Content-type': 'application/json'}, method : 'POST', body: document.cookie}
        )
        .then(response => response.json())
        .then(res => { console.log(res, res.result)
          if (res.result == 'true') {
            setAuthentication(false)
            console.log('token')
          } else if (res.result == 'missing_field_in_cookie' || res.result == 'not_valid_user' || res.result == 'wrong_token') {
            setAuthentication(true)
            alert('You should SignIn again')
          } 
          else if (res.result == 'no_cookie') {
            setAuthentication(true)
            alert('You should first SignIn')
          }
          else {
            setAuthentication(true)
            alert('Your session has ended, SignIn again')
          }
          console.log(authenticated, 'a')
        })
      })();
    }, [])

    return (
      <div className="App">
        <header className="App-header">

            <Route exact path="/index" component={Data} >
              {authenticated && <h1>{!authenticated}</h1> && history.push('/')}
            </Route>
            <Route exact path="/" component={Login}></Route>

        </header>
      </div>
    );
  }

  export default App;
