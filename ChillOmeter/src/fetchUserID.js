import axios from "axios";

export async function fetchUserID(username) {
  const options = {
    method: "GET",
    url: "https://twitter-api47.p.rapidapi.com/v2/user/by-username",
    params: { username },
    headers: {
      "x-rapidapi-key": "0cebf5fe6amshbfec054204c6dd9p148a7cjsn4159d63c8aca",
      "x-rapidapi-host": "twitter-api47.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.rest_id; // Return the user ID
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
}
