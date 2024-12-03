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

    // Extract tweets[0] to tweets[10]
    const tweetsText = response.data.tweets
      .slice(0, 14) // Get the first 10 tweets
      .map((tweet) => tweet.content.itemContent.tweet_results.result.legacy.full_text)
      .join("\n\n");

    return tweetsText; // Return the tweets text
  } catch (error) {
    console.error("Error fetching tweets:", error);
    throw error;
  }
}
