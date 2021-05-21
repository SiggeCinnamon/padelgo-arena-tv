import { useEffect, useState } from "react";
import { getCourtsWithClubId } from "../services/Court.js";
import { getStreamsWithCourtId } from "../services/Streams.js";
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
  const [liveGames, setLiveGames] = useState();
  const [globalState] = useGlobal();

  console.log("court::", courts);
  console.log("livegames@fetch", liveGames);

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

  useEffect(() => {
    const forLoop = async (_) => {
      let temp = [];

      for (let index = 0; index < courts.length; index++) {
        const ids = courts[index];
        const stream = await getStreamsWithCourtId(ids.id);
        if (stream.length > 0) {
          temp.push(courts[index]);
        }
      }
      setLiveGames(temp);
    };
    forLoop();
  }, [courts]);

  return [courts, setCourts, liveGames];
};

export default useFetchCourts;
