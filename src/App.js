import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Routes from "./routes.json";
import Home from "./pages/Home/Home.js";
import Court from "./pages/Court/Court.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import ArenaTv from "./pages/ArenaTv/ArenaTv.js";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={Routes.HOME} exact component={Home} />
        <Route path={Routes.COURT} component={Court} />
        <Route path={Routes.DASHBOARD} component={Dashboard} />
        <Route path={Routes.ARENA_TV} component={ArenaTv} />
      </Switch>
    </Router>
  );
}

export default App;
