import { useEffect, useState } from "react";
import { getCourtsWithClubId } from "../services/Court.js";

const useFetchCourts = (id) => {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    const fCourts = await getCourtsWithClubId(id);
    setCourts(fCourts);
  };

  return [courts, setCourts];
};

export default useFetchCourts;
