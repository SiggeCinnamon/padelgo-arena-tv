import axios from "axios";

async function getCourtsAPIGETResponse(route) {
  try {
    // setDebugLevel(1);

    const config = {
      baseURL: process.env.REACT_APP_COURTS_API_BASE_URL,
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

export async function getCourtsWithClubId(clubId) {
  return await getCourtsAPIGETResponse(`/Courts/${clubId}`);
}
