import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import Player from "../../components/Player";
import useLookForGames from "../../hooks/useLookForGames";
import useGlobal from "../../vault";

function Court({ match, history }) {
  const [games, setGames, numberOfGames, gamesIndex] = useLookForGames(match.params.clubId);
  const [globalState, globalAction] = useGlobal();

  useEffect(() => {
    const matchPlaying = async () => {
      const liveStreamTempHash = await HashGen(liveStreamTemp);
      const liveStreamHash = await HashGen(liveStream);
      if (liveStreamTempHash !== liveStreamHash) {
        setId(new Number(id));
      }
    };

    matchPlaying();
  }, [liveStreamTemp]);

  useEffect(() => {
    const onKeyDownHandler = (event) => {
      if (event.defaultPrevented) return;
      switch (event.key) {
        case 'Escape':
          history.goBack();
          break;
        default:
          break;
      }
    };
  
    document.addEventListener('keydown', onKeyDownHandler);
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
  useEffect(() => {
    if (match.params.id) {
      globalAction.setClubId(match.params.id);
      globalAction.setClubName(match.params.clubName);
    }
  }, [match.params.id]);

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
