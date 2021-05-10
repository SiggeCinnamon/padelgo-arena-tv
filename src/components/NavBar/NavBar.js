import { withRouter } from "react-router";
import styles from "./NavBar.module.scss";

/**
 * A component that is an overlay with absolute setting, consisting of one link that brings you back to the page you were on previously
 * @author Mattias Andersen
 *
 * @param  {String} clubName A String representing the clubs name
 * @param  {Function} history A react-router function that allows us to send the user back to previous pages
 * @return {JSX} React JSX Rendering
 */
const NavBar = ({ clubName, history }) => {
  return (
    <>
      <nav className={styles.__NavBar_bar}>
        <div className={styles.__NavBar_title}>
          <p
            onClick={() => {
              history.goBack();
            }}
          >
            padelgo.tv - stream for free
          </p>
        </div>
        <div className={styles.__NavBar_clubName}>
          <p>{clubName}</p>
        </div>
      </nav>
    </>
  );
};

export default withRouter(NavBar);
