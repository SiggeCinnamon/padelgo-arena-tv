import React, { useEffect } from "react";
import { withRouter, useParams } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import Player from "../../components/Player";
import useLookForGames from "../../hooks/useLookForGames";
import useGlobal from "../../vault";
import useGTMData from "../../hooks/useGTMData";

function Court({ history, rotates = true }) {
  const params = useParams();
  const [games, setGames, numberOfGames, gamesIndex] = useLookForGames(params.clubId, rotates);

  useEffect(() => {
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

  if (numberOfGames === 0) {
    return (
      <>
        <Player clubId={params.clubId} />
      </>
    );
  } else
    return (
      <>
        {numberOfGames && (
          <Scoreboard
            clubName={games[gamesIndex].clubName}
            liveStreamId={games[gamesIndex].liveEventExtId}
            fTeams={games[gamesIndex].id}
            poster={games[gamesIndex].thumbnailURL}
            stream={games[gamesIndex]}
          />
        )}
      </>
    );
}
export default withRouter(Court);
