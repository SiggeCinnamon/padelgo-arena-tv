import { useEffect, useState } from "react";
import { getCourtsWithClubId } from "../services/Court.js";
import useGlobal from "../vault";

/**
 * A custom hook used for fetching all courts from a club with specified id from the API
 * @author Christoffer Hansen
 *
 * @param  {Number} id A Number that represents the clubs id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched courts
 */
const useFetchCourts = (id) => {
  const [courts, setCourts] = useState([]);
  const [globalState] = useGlobal();

  useEffect(() => {
    const fetchCourts = async () => {
      const fCourts = await getCourtsWithClubId(id, globalState.clubName);

      const pipedCourts = fCourts.map((element) => {
        return { id: element.courtId, name: element.description };
      });

      setCourts(pipedCourts);
    };

    fetchCourts();
  }, [id]);

  return [courts, setCourts];
};

export default useFetchCourts;
