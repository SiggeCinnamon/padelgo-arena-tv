import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Routes from "../../routes.json";
import styles from "./Dashboard.module.scss";
import NavBar from "../../components/NavBar";
import useFetchCourts from "../../hooks/useFetchCourts.js";
import TextCard from "../../components/TextCard";
import DropCard from "../../components/DropCard";
import useGlobal from "../../vault";

function Dashboard({ match, history }) {
  const [courts, setCourts] = useFetchCourts(match.params.id);
  const [globalState, globalAction] = useGlobal();

  useEffect(() => {
    if (history.location.state.name && globalState.clubName !== history.location.state.name) {
      globalAction.setClubName(history.location.state.name);
    }
  }, [history]);

  useEffect(() => {
    if (match.params.id) {
      globalAction.setClubId(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDownHandler);
    return () => {
      document.removeEventListener("keydown", onKeyDownHandler);
    };
  }, []);

  const onKeyDownHandler = (event) => {
    if (event.defaultPrevented) return;

    switch (event.key) {
      case "Escape":
        history.goBack();
        break;
      default:
        break;
    }
  };

  return (
    <>
      <NavBar clubName={history.location.state.name} />
      <div className={styles.__dashboard_container + " container-fluid"}>
        <TextCard
          textHeader="Showcase"
          textBody={`Continuously display highlights and streams from your club in fullscreen.

                Return here by clicking at padelgo.tv in the top left or press ESC.`}
          linkTo={Routes.ARENA_TV.replace(":id", match.params.id)}
          toggleSwitch={true}
        />

        <DropCard
          textHeader="Score"
          textBody={`Show scores from ongoing games.
                        Return here by clicking at padelgo.tv in the top left or press ESC.`}
          pOptions={courts.sort((a, b) => a.name.localeCompare(b.name, "se", { numeric: true }))}
          optionHeader="Courts"
          linkTo={Routes.COURT.replace(":clubId", match.params.id)}
          toggleSwitch={true}
        />
      </div>
    </>
  );
}

export default withRouter(Dashboard);
