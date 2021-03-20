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
      (async function verify (token) {
        fetch('http://localhost:8000/verify/',
         {headers: {'Content-type': 'application/json'}, method : 'POST', body: document.cookie}
        )
        .then(response => response.json())
        .then(res => { console.log(res)
          // if (res.token == token) {
          //   setAuthentication(false)
          //   console.log(authenticated, 'a')
          // }else {
          //   setAuthentication(true)
          //   console.log(authenticated, 'b')
          // }
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
