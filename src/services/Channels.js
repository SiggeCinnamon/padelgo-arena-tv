import axios from "axios";

async function getChannelsAPIGETResponse(route) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_CHANNELS_API_BASE_URL,
      method: "GET",
    };

    try {
      const result = await axios.create(config).get(route);
      return result.data;
    } catch (error) {
      if (
        typeof error.response !== "undefined" &&
        error.response.status === 404
      ) {
        console.error("Got 404 response from channels API");
        return false;
      } else {
        console.log("Generic error in channels API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the channels API.");
    console.error(error);
  }
}

export async function getChannelsInfoWithChannelName(channelName) {
  return await getChannelsAPIGETResponse(`/Channels/channel/${channelName}`);
}
