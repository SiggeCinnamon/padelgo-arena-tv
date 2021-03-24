import axios from "axios";

/* {
  "clubId": 0,
  "stream": true,
  "liveStream": true,
  "highlight": true,
  "video": true,
  "page": 0,
  "take": 0,
  "sortOrder": 0
} */

async function getMediaAPIPOSTResponse(route, payload) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_STREAMS_API_BASE_URL,
      method: "POST",
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
      if (
        typeof error.response !== "undefined" &&
        error.response.status === 404
      ) {
        console.log("Got 404 response from stream API");
        throw error;
      } else {
        console.log(
          `Generic error in stream API for route ${route}. we should log this.`
        );
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

export async function getTrendingMedia(filter) {
  return await getMediaAPIPOSTResponse(`/Media/trending`, filter);
}

export async function getPopularMedia(filter) {
  return await getMediaAPIPOSTResponse(`/Media/popular`, filter);
}
