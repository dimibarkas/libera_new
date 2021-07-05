import React from "react"
import { routes } from "./routes"
import { Redirect, Route, Switch } from "react-router"

fetch("/api/articles")
  .then(response => response.json())
  .then(data => console.log(data));

function App() {
  return (
    <>
      <Switch>
        {routes.map((item) => (
          <Route exact key={item.path} path={item.path} component={item.component} />
        ))}
        <Redirect to={"/"} />
      </Switch>
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

