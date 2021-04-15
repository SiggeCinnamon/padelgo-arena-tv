import React, { useEffect } from "react";
import Player from "../../components/Player";
import { withRouter } from "react-router-dom";

const ArenaTv = ({ match, history }) => {
  
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
      <Player clubId={match.params.id} />
    </>
  );
};

export default withRouter(ArenaTv);
