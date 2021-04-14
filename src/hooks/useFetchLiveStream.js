import { useEffect, useState } from "react";
import { getStreamsWithCourtId } from "../services/Streams.js";

const useFetchLiveStream = (courtId) => {
  const [liveStream, setLiveStream] = useState({
    isLoading: false,
    isLoaded: false,
    result: false,
  });
  useEffect(() => {
    fetchLiveStream();
  }, [courtId]);

  const fetchLiveStream = async () => {
    if (courtId !== null) {
      setLiveStream({ isLoading: true });
      getStreamsWithCourtId(courtId).then((liveStream) => {
        setLiveStream({ isLoaded: true, isLoading: false, result: liveStream });
      });
    } else {
      console.log("else i fetchLiveStream");
    }
  };
  return [liveStream, setLiveStream];
};
export default useFetchLiveStream;
