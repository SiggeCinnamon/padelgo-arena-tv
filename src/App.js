import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Routes from "./routes.json";
import Court from "./components/Court.js";
import Home from "./components/Home.js";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path={Routes.HOME} exact component={Home} />
          <Route path={Routes.COURTS} component={Court} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
