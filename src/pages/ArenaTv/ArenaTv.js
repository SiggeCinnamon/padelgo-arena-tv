import React, { useEffect } from "react";
import Player from "../../components/Player";
import { withRouter } from "react-router-dom";
import useGlobal from "../../vault";

const ArenaTv = ({ match, history }) => {
  const [globalState] = useGlobal();

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
      <Player clubId={match.params.id} clubName={globalState.clubName} />
    </>
  );
};

export default withRouter(ArenaTv);
