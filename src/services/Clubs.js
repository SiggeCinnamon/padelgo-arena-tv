import axios from "axios";
import GTM from "../utilities/GTM";

async function getClubsAPIGETResponse(route) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_CLUBS_API_BASE_URL,
      method: "GET"
    };

    try {
      const result = await axios.create(config).get(route);
      return result.data;
    } catch (error) {
      if (typeof error.response !== "undefined" && error.response.status === 404) {
        console.error("Got 404 response from clubs API");
        return false;
      } else {
        console.log("Generic error in clubs API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the clubs API.");
    console.error(error);
  }
}

export async function getClubDataWithClubId(clubId, clubName) {
  GTM("media_request", {
    club_id: clubId,
    club_name: clubName
  });

  return await getClubsAPIGETResponse(`/Clubs/${clubId}`);
}
export async function getClubs() {
  return await getClubsAPIGETResponse("Clubs");
}
