import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Routes from "./routes.json";
import Court from "./pages/Court/Court.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import ArenaTv from "./pages/ArenaTv/ArenaTv.js";

function App() {
  const Home = () => {
    return <h1>Home</h1>;
  };

  return (
    <Router>
      <div className='App'>
        <main className='container'>
          <Switch>
            <Route path={Routes.HOME} exact component={Home} />
            <Route path={Routes.COURT} component={Court} />
            <Route path={Routes.DASHBOARD} component={Dashboard} />
            <Route path={Routes.ARENA_TV} component={ArenaTv} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
