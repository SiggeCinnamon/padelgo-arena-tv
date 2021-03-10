import React, { BrowserRoute as Router, Switch, Route } from "React";
import "./App.css";
import Court from "./components/Court.js";

function App() {
  const Home = () => {
    <h1>Home</h1>;
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/courts/:extid" component={Court} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
