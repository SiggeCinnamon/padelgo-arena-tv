import { withRouter } from "react-router";
import styles from "./NavBar.module.scss";

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
