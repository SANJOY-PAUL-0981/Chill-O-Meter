import axios from "axios";

export async function fetchTweets(userId) {
  const options = {
    method: "GET",
    url: "https://twitter-api47.p.rapidapi.com/v2/user/tweets",
    params: { userId },
    headers: {
      "x-rapidapi-key": "0cebf5fe6amshbfec054204c6dd9p148a7cjsn4159d63c8aca",
      "x-rapidapi-host": "twitter-api47.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    // Safely extract tweets
    const tweets = response.data.tweets || [];
    const tweetsText = tweets
      .slice(0, 19)
      .map((tweet) => 
        tweet?.content?.itemContent?.tweet_results?.result?.legacy?.full_text || "Unavailable"
      )
      .join("\n\n");

    return tweetsText;
  } catch (error) {
    console.error("Error fetching tweets:", error.message);
    throw error;
  }
}
