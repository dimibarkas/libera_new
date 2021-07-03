import logo from './logo.svg';
import './App.css';

fetch("/api/articles")
  .then(response => response.json())
  .then(data => console.log(data));

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
        </a>
      </header>
    </div>
  );
}

export default App;

/*
* ToDo's:
* #1 Feste IP-Range des Containers bestimmen und in MongoDB eintragen.
* #2 Tests Automatisieren.
* #3 Eigene Domain zuweisen.
*/

