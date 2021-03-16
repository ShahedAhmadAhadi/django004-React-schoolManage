import logo from './logo.svg';
import { useState, useEffect } from 'react'
import './App.css';
import Data from './components/index'
import { Route, Redirect } from 'react-router-dom'
import Login from './components/login'


  function App() {
    const [authenticated, setAuthentication] = useState(null)


    useEffect(() => {
      async function verify (token) {
        fetch('http://localhost:8000/verify/')
        .then(response => response.json())
        .then(res => {
          if (res.token == token) {
            setAuthentication(true)
            console.log(authenticated)
          }
        })
      }
      verify(window.localStorage.getItem('token'))
    }, [authenticated])

    
    // console.log(authenticated)
    return (
      <div className="App">
        <header className="App-header">
          <Route exact path="/Login" component={Login} />
          <Route exact path="/" component={Data}>
              {authenticated ?
                <Redirect to="/" /> :
                <Redirect to="/Login"/>
              }

          </Route>

        </header>
      </div>
    );
  }

  export default App;
