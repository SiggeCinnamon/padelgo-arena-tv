import axios from "axios";

async function getUsersAPIGETResponse(route) {
  try {
    const config = {
      baseURL: process.env.REACT_APP_USERS_API_BASE_URL,
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
        console.error("Got 404 response from users API");
        return false;
      } else {
        console.log("Generic error in users API. we should log this.");
        console.error(error);
        throw error;
      }
    }
  } catch (error) {
    console.log("There was an error calling the users API.");
    console.error(error);
  }
}

export async function getUsersProfileImageWithChannel(
  channel,
  width = 180,
  height = 180
) {
  return await getUsersAPIGETResponse(
    `/users/${channel}/profileImage?width=${width}&height=${height}`
  );
}
