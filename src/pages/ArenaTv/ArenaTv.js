import React, { useEffect } from "react";
import Player from "../../components/Player";
import { withRouter, useParams } from "react-router-dom";
import useRouteQuery from "../../hooks/useRouteQuery";

const ArenaTv = ({ history }) => {
  const params = useParams();
  const query = useRouteQuery();

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
      <Player
        clubId={params.clubId}
        clubName={params.clubName}
        include={query.has("include") ? query.get("include") : true}
      />
    </>
  );
};

export default withRouter(ArenaTv);
