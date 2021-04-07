import { useEffect, useState } from "react";
import { getClubs } from "../services/Clubs.js";

const useFetchClubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetchClubs();
  }, []);

  const fetchClubs = async () => {
    const fClubs = await getClubs();
    setClubs(fClubs);
  };

  return [clubs, setClubs];
};

export default useFetchClubs;
