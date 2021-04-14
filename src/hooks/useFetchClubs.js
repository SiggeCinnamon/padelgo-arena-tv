import { useEffect, useState } from "react";
import { getClubs } from "../services/Clubs.js";

/**
 * A custom hook used for fetching all clubs information from the API
 * @author Christoffer Hansen
 *
 * @return {Array} It will return a useState array consisting of all the fetched clubs
 */
const useFetchClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const fClubs = await getClubs();

      const pipedClubs = fClubs.map((element) => {
        return { id: element.clubId, name: element.name };
      });

      setClubs(pipedClubs);
    };

    fetchClubs();
  }, []);

  return [clubs, setClubs];
};

export default useFetchClubs;
