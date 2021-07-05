import React from "react"
import Login from "./views/login-page"

fetch("/api/articles")
  .then(response => response.json())
  .then(data => console.log(data));

function App() {
  return (
    <>
      <Login />
    </>
  );
}

export default App;

/*
* ToDo's:
* #1 Feste IP-Range des Containers bestimmen und in MongoDB eintragen.
* #2 Tests Automatisieren.
* #3 Eigene Domain zuweisen.
* #4 Swagger UI in Projekt einbinden.
*/

