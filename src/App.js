import './App.css';
import Clubs from './componets/Clubs'
import Courts from './componets/Courts'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/clubs">clubs</Link>
            </li>
            <li>
              <Link to="/court">courts</Link>
            </li>
            <li>
              <Link to="/">home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/clubs">
            <Clubs />
          </Route>
          <Route path="/court">
            <Courts />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
