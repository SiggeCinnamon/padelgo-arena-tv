import { useEffect, useState } from "react";
import { getClubDataWithClubId } from "../services/Clubs.js";
import useGlobal from "../vault";
/**
 * A custom hook used for fetching a specific clubs information with the clubs id from the API
 * @author Christoffer Hansen
 *
 * @param  {Number} id A Number that represents the clubs id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched club
 */
const useFetchClub = (id) => {
  const [club, setClub] = useState({});
  const [globalState] = useGlobal();

  useEffect(() => {
    const fetchClub = async () => {
      const fClub = await getClubDataWithClubId(id, globalState.clubName);
      setClub(fClub);
    };

    fetchClub();
  }, [id]);

  return [club, setClub];
};

export default useFetchClub;
