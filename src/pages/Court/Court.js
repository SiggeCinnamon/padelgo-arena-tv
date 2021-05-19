import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import Player from "../../components/Player";
import useLookForGames from "../../hooks/useLookForGames";


function Court({ match, history }) {
  const [games, setGames, numberOfGames, gamesIndex] = useLookForGames(match.params.clubId);

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
  if (numberOfGames && numberOfGames === 0) {
    return (
      <>
        <Player clubId={match.params.clubId} />
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
            stream={games}
            match={match}
          />
        )}
      </>
    );
}
export default withRouter(Court);
