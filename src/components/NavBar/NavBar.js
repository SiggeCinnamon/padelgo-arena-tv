import { withRouter } from "react-router";
import styles from "./NavBar.module.scss";

/**
 * A component that is an overlay with absolute setting, consisting of one link that brings you back to the page you were on previously
 * @author Mattias Andersen
 *
 * @param  {Function} history A react-router function that allows us to send the user back to previous pages
 * @return {JSX} React JSX Rendering
 */
const NavBar = ({ history }) => {
  return (
    <>
      <nav className={styles.__NavBar_bar}>
        <p
          onClick={() => {
            history.goBack();
          }}>
          padelgo.tv - stream for free
        </p>
      </nav>
    </>
  );
};

export default withRouter(NavBar);
