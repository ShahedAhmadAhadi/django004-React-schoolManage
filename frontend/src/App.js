import logo from './logo.svg';
import './App.css';
import Data from './components/index'
import { Route } from 'react-router-dom'


const Page = () => (
  <div>
    <h1>Hi</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React

        </a> */}
        {/* <Data /> */}
        <Route exact path="/Page" component={Page}/>
        <Route exact  path="/" component={Data} />
      </header>
    </div>
  );
}

export default App;
