import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";
import Player from "../../components/Player";
import useLookForGames from "../../hooks/useLookForGames";
import useFetchLiveStream from "../../hooks/useFetchLiveStream";

function Court({ match, history }) {
  const [games, setGames, numberOfGames, gameToWatch] = useLookForGames(match.params.clubId);
  console.log(gameToWatch);
  if (numberOfGames === 0) {
    return (
      <>
        <Player clubId={match.params.clubId} />
      </>
    );
  } else
    return (
      <>
        {numberOfGames != null && numberOfGames && (
          <Scoreboard
            clubName={games[0].clubName}
            liveStreamId={games[0].id}
            poster={games[0].thumbnailURL}
            stream={games}
            match={match}
          />
        )}

        {games &&
          games.map((o, i) => (
            <div className="container" key={i}>
              {o.id}
            </div>
          ))}
      </>
    );
}
export default withRouter(Court);
