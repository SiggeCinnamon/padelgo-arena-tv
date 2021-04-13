import { useEffect, useState } from "react";
import { getCourtsWithClubId } from "../services/Court.js";

const useFetchCourts = (id) => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    const fetchCourts = async () => {
      const fCourts = await getCourtsWithClubId(id);

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
