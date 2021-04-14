import { useEffect, useState } from "react";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useFetchLiveStream = (courtId) => {
  const [liveStream, setLiveStream] = useState({
    isLoading: false,
    isLoaded: false,
    result: false,
  });
  useEffect(() => {

  }, []);

  console.log(liveStream);
  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
