import React from "react"
import { routes, LOGGED_IN } from "./routes"
import { Redirect, Route, Switch } from "react-router"
import { useSelector } from "react-redux"


fetch("/api/articles")
  .then(response => response.json())
  .then(data => console.log(data));

function App() {
  return (
    <>
      <Switch>
        {routes.map((route, i) => {
          if (route.guarded === LOGGED_IN) {
            return <LoggedInRouteWithSubRoutes key={i} {...route} />;
          }
          return <RouteWithSubRoutes key={i} {...route} />;
        })}
      </Switch>
    </>
  );
}

function LoggedInRouteWithSubRoutes(route) {
  const isLoggedIn = useSelector((state) => state.user.loggedIn)
  if (isLoggedIn === true) {
    return (
      <Route
        path={route.path}
        render={(props) => <route.component {...props} routes={route.routes} />}
      />
    )
  }
  return <Redirect path={route.path} to="/login" />;
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

export default App;

/*
* ToDo's:
* #1 Feste IP-Range des Containers bestimmen und in MongoDB eintragen.
* #2 Tests Automatisieren.
* #4 Swagger UI in Projekt einbinden.
*/

