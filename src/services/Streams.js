import axios from "axios";

async function getStreamsAPIGETResponse(route) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_STREAMS_API_BASE_URL,
      method: "GET",
    };

    try {
      const result = await axios.create(config).get(route);
      return result.data;
    } catch (error) {
      if (typeof error.response !== "undefined" && error.response.status === 404) {
        console.error("Got 404 response from court API");
        return false;
      } else {
        console.log("Generic error in court API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the court API.");
    console.error(error);
  }
}

export async function getStreamsWithCourtId(courtId) {
  return await getStreamsAPIGETResponse(`/Streams/court/${courtId}`);
}

export async function getStreamURLWithLiveStreamId(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Streams/url/anonymously/${liveStreamId}`);
}

export async function getStreamThumbnailWithLiveStreamId(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Streams/${liveStreamId}/thumbnail`);
}

export async function getTeamsOnStreamWithLiveStreamId(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Teams/teams/${liveStreamId}`);
}
export async function getTeamsOnStream(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Teams/teams/${liveStreamId}`);
}
