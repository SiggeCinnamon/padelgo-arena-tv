import React from "react";
import Player from "../../components/Player";

const ArenaTv = ({ match }) => {
  return (
    <>
      <Player clubId={match.params.clubId} />
    </>
  );
};

export default ArenaTv;
