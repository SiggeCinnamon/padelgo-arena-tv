import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import Routes from "../../routes.json";
import styles from "./Dashboard.module.scss";
import NavBar from "../../components/NavBar";
import useFetchCourts from "../../hooks/useFetchCourts.js";
import TextCard from "../../components/TextCard";
import DropCard from "../../components/DropCard";
import useGlobal from "../../vault";

function Dashboard({ history }) {
  const params = useParams();
  const [globalState, globalActions] = useGlobal();
  const [courts, setCourts] = useFetchCourts(params.clubId);
  const [value, setValue] = useState(globalState.showLivestreams !== undefined ? globalState.showLivestreams : true);

  useEffect(() => {
    if (params.clubId && globalState.clubId !== params.clubId) {
      globalActions.setClubId(params.clubId);
    }
  }, [params.clubId]);

  useEffect(() => {
    if (params.clubName && globalState.clubName !== params.clubName) {
      globalActions.setClubName(params.clubName);
    }
  }, [params.clubName]);

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

  const onLivestreamToggleChange = (event) => {
    globalActions.setShowLivestreams(!value);
    setValue(!value);
  };

  return (
    <>
      <NavBar clubName={params.clubName} />
      <div className={styles.__dashboard_container + " container-fluid"}>
        <TextCard
          textHeader="Showcase"
          textBody={`Continuously display highlights and streams from your club in fullscreen.

                Return here by clicking at padelgo.tv in the top left or press ESC.`}
          linkTo={
            Routes.ARENA_TV.replace(":clubId", params.clubId).replace(":clubName", params.clubName) +
            "?include=" +
            value
          }
          toggleSwitch={{ show: true, value: value }}
          onToggleChange={onLivestreamToggleChange}
        />

        <DropCard
          textHeader="Score"
          textBody={`Show scores from ongoing games.
                        Return here by clicking at padelgo.tv in the top left or press ESC.`}
          pOptions={courts.sort((a, b) => a.name.localeCompare(b.name, "se", { numeric: true }))}
          optionHeader="Courts"
          clubName={params.clubName}
          linkTo={Routes.COURT.replace(":clubId", params.clubId)}
          toggleSwitch={true}
        />
      </div>
    </>
  );
}

export default withRouter(Dashboard);
