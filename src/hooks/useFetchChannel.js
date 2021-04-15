import { useEffect, useState } from "react";
import { getChannelsInfoWithChannelName } from "../services/Channels.js";

/**
 * A custom hook used for fetching a specific clubs information with the clubs id from the API
 * @author Kalle Anka
 *
 * @param  {Number} id A Number that represents the clubs id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched club
 */
const useFetchChannel = (id) => {
  const [channel,setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      const fChannel = await getChannelsInfoWithChannelName(id);
      setChannel(fChannel);
    };

    fetchChannel();
  }, [id]);
  console.log(channel,'aaaaaaaaaaaaaaaaaaa');

  return [channel,setChannel];
};

export default useFetchChannel;
