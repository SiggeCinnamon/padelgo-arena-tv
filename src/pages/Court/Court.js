import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Scoreboard from "../../components/ScoreBoard/ScoreBoard.js";

function Court({ match, history }) {
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
      <Scoreboard match={match} />
    </>
  );
}

export default withRouter(Court);
