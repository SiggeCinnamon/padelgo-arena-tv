import { useEffect, useState } from "react";
import useGlobal from "../vault";

const useGTMData = (clubId, clubName) => {
  const [globalState, globalActions] = useGlobal();
  const [id, setId] = useState(clubId);
  const [name, setName] = useState(clubName);

  useEffect(() => {
    if (id && id !== globalState.clubId) {
      globalActions.setClubId(id);
    }

    if (name && name !== globalState.clubName) {
      globalActions.setClubName(name);
    }
  }, [id, name]);

  return [id, name, setId, setName];
};

export default useGTMData;
