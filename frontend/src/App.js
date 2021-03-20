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
            setAuthentication(true)
            
          } else if (res.result == 'missing_field_in_cookie' || res.result == 'not_valid_user' || res.result == 'wrong_token') {
            setAuthentication(false)
            alert('You should SignIn again')
          } 
          else if (res.result == 'no_cookie') {
            setAuthentication(false)
            alert('You should first SignIn')
          }
          else {
            setAuthentication(false)
            alert('Your session has ended, SignIn again')
          }
        })
      })(window.localStorage.getItem('token'));
    }, [])

    return (
      <div className="App">
        <header className="App-header">

            <Route exact path="/index" component={Data} >
              {authenticated && history.push('/')}
            </Route>
            <Route exact path="/" component={Login}></Route>

        </header>
      </div>
    );
  }

  export default App;
