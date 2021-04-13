import { useEffect, useState } from "react";
import { getClubDataWithClubId } from "../services/Clubs.js";

const useFetchClub = (id) => {
  const [club, setClub] = useState({});

  useEffect(() => {
    const fetchClub = async () => {
      const fClub = await getClubDataWithClubId(id);
      setClub(fClub);
    };

    fetchClub();
  }, [id]);

  return [club, setClub];
};

export default useFetchClub;
