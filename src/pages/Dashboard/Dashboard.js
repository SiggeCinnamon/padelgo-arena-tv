import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Routes from "../../routes.json";
import styles from "./Dashboard.module.scss";
import NavBar from "../../components/NavBar";
import useFetchCourts from "../../hooks/useFetchCourts.js";
import TextCard from "../../components/TextCard";
import DropCard from "../../components/DropCard";

function Dashboard({ match, history }) {
  const [courts, setCourts] = useFetchCourts(match.params.id);

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
      <NavBar clubId={match.params.id} />
      <div className={styles.__dashboard_container + " container-fluid"}>
        <TextCard
          textHeader="Showcase"
          textBody={`Continuously display highlights and streams from your club in fullscreen.

                Return here by clicking at padelgo.tv in the top left or press ESC.`}
          linkTo={Routes.ARENA_TV.replace(":id", match.params.id)}
        />

        <DropCard
          textHeader="Score"
          textBody="Display the current score from a live stream. Pick a court in the
              list below."
          pOptions={courts.sort((a, b) => a.name.localeCompare(b.name, "se", { numeric: true }))}
          optionHeader="Courts"
          linkTo={Routes.COURT.replace(":clubId", match.params.id)}
        />
      </div>
    </>
  );
}

export default withRouter(Dashboard);
