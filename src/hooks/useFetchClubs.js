import { useEffect, useState } from "react";
import { getClubs } from "../services/Clubs.js";

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
