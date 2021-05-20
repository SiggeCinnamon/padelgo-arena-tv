import axios from "axios";
import GTM from "../utilities/GTM";

async function getMediaAPIGETResponse(route) {
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
        console.error("Got 404 response from media API");
        return false;
      } else {
        console.log("Generic error in media API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the court API.");
    console.error(error);
  }
}

async function getMediaAPIPOSTResponse(route, payload) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_STREAMS_API_BASE_URL,
      method: "POST"
    };

    try {
      if (payload) {
        const result = await axios.create(config).post(route, payload);
        return result.data;
      } else {
        const result = await axios.create(config).post(route);
        return result.data;
      }
    } catch (error) {
      if (typeof error.response !== "undefined" && error.response.status === 404) {
        console.log("Got 404 response from stream API");
        throw error;
      } else {
        console.log(`Generic error in stream API for route ${route}. we should log this.`);
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the stream API.");
    console.error(error);
    throw error;
  }
}

export async function getMediaWithClubId(clubId, clubName) {
  GTM("media_request", {
    club_id: clubId,
    club_name: clubName
  });

  return await getMediaAPIGETResponse(`/Media/clubId?clubId=${clubId}`);
}
