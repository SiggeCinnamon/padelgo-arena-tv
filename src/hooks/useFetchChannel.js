import { useEffect, useState } from "react";
import { getChannelsInfoWithChannelName } from "../services/Channels.js";
import useGlobal from "../utilities/GTM";

/**
 * A custom hook used for fetching a specific clubs information with the clubs id from the API
 * @author Mattias Andersen
 *
 * @param  {Number} id A Number that represents the player id, used when fetching data from API
 * @return {Array} It will return a useState array consisting of the fetched club
 */
const useFetchChannel = (id) => {
  const [channel, setChannel] = useState({});


  useEffect(() => {
    const fetchChannel = async () => {
      // const fChannel = await getChannelsInfoWithChannelName(id, globalState.clubId, globalState.clubName);
      const fChannel = await getChannelsInfoWithChannelName(id);
      setChannel(fChannel);
    };

    fetchChannel();
  }, [id]);

  return [channel, setChannel];
};

export default useFetchChannel;
