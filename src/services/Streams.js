import axios from "axios";
import GTM from "../utilities/GTM";

async function getStreamsAPIGETResponse(route) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_STREAMS_API_BASE_URL,
      method: "GET"
    };

    try {
      const result = await axios.create(config).get(route);
      return result.data;
    } catch (error) {
      if (typeof error.response !== "undefined" && error.response.status === 404) {
        console.error("Got 404 response from stream API");
        return false;
      } else {
        console.log("Generic error in stream API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the stream API.");
    console.error(error);
  }
}

export async function getStreamsWithCourtId(courtId) {
  return await getStreamsAPIGETResponse(`/Streams/court/${courtId}`);
}

export async function getStreamsDataWithStreamId(streamId, clubId, clubName) {
  GTM("media_request", {
    club_id: clubId,
    club_name: clubName
  });

  return await getStreamsAPIGETResponse(`/Streams/${streamId}`);
}

export async function getStreamURLWithLiveStreamId(liveStreamId, clubId, clubName) {
  GTM("media_request", {
    club_id: clubId,
    club_name: clubName
  });

  return await getStreamsAPIGETResponse(`/Streams/url/anonymously/${liveStreamId}`);
}

export async function getStreamThumbnailWithLiveStreamId(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Streams/${liveStreamId}/thumbnail`);
}

export async function getTeamsOnStreamWithLiveStreamId(liveStreamId) {
  return await getStreamsAPIGETResponse(`/Teams/teams/${liveStreamId}`);
}
export async function getTeamsOnStream(liveStreamId, clubId, clubName) {
  GTM("media_request", {
    clubId,
    clubName
  });

  return await getStreamsAPIGETResponse(`/Teams/teams/${liveStreamId}`);
}
