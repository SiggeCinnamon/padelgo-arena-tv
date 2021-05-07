import { useState, useEffect } from "react";
import { withRouter } from "react-router";
import styles from "./NavBar.module.scss";
import { getClubDataWithClubId } from "../../services/Clubs.js";

/**
 * A component that is an overlay with absolute setting, consisting of one link that brings you back to the page you were on previously
 * @author Mattias Andersen
 *
 * @param  {Number} clubId A Number representing the club that the user picked from Home page
 * @param  {Function} history A react-router function that allows us to send the user back to previous pages
 * @return {JSX} React JSX Rendering
 */
const NavBar = ({ clubId = -1, history }) => {
  const [clubName, setClubName] = useState();

  useEffect(() => {
    const fetchClubData = async () => {
      const clubData = await getClubDataWithClubId(clubId);

      setClubName(clubData.name);
    };

    if (clubId && clubId !== -1) {
      fetchClubData();
    }
  }, [clubId]);

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
