import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Routes from "./routes.json";
import Home from "./pages/Home";
import Court from "./pages/Court";
import Dashboard from "./pages/Dashboard";
import ArenaTv from "./pages/ArenaTv";
import TagManager from "react-gtm-module";

function App() {
  const tagManagerArgs = {
    gtmId: process.env.REACT_APP_GTM_ID
  };

  TagManager.initialize(tagManagerArgs);

  return (
    <Router>
      <Switch>
        <Route path={Routes.HOME} exact component={Home} />
        <Route path={Routes.COURT} component={Court} />
        <Route path={Routes.DASHBOARD} component={Dashboard} />
        <Route path={Routes.ARENA_TV} component={ArenaTv} />
        <Route path={Routes.NO_MATCH}>
          <Redirect to={Routes.HOME} exact component={Home} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
