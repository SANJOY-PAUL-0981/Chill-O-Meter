import { useState } from "react";
import "./App.css";
import chillGuy from "../src/assets/chillGuy.jpg";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
import { fetchUserID } from "./fetchUserID";
import { fetchTweets } from "./fetchTweets";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

function App() {
  const [username, setUsername] = useState("");
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  {/*safety setting initilization*/ }
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  {/*model initilization*/ }
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySettings,
  });

  {/*fetch user ID and tweets*/ }
  const handleFetchData = async () => {
    if (!username) {
      alert("Please enter a username!");
      return;
    }

    try {
      {/*Fetch User ID*/ }
      const userId = await fetchUserID(username);
      console.log("Fetched User ID:", userId);

      {/*Fetch Tweets */ }
      const tweetsList = await fetchTweets(userId);
      console.log(tweetsList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const prompt = `Rate the user's Chill nature and tell the percentage of his chill, based on their tweets,
  Rules:
  1. DO NOT EXPLAIN ANYTHING ONLY TELL THE VALUE.
  2. NO NEED TO EXPLAIN THE REASONS BEHIND VALUE. 
  3. JUJST ONLY GENERATE THE VALUE.
  4. GENERATE THE ANSWER BEING 200% SURE ON PERCENTAGE VALUE.
  5. THE ANSWER WILL BE IN THIS FORMAT " You {RESULT}% chill".
  6. THE CHILL RATE CAN BE ANY NUMBER BETWEEN 0-100.
  Here are the Tweets: 
  It's been a long time since I have seen any new anime 😔
  Bruh😔....
Whatever nnn is over
Bro is Batman now 🦇
next year I will try to make if full green`;

  async function generateChillScore() {
    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }

  generateChillScore();

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-[90vh] mb-20">
        <div className="border-2 border-amber-800/20 w-[80vw] h-[80vh] rounded-3xl flex justify-between items-center p-14 gap-10 shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.45)]">

          {/* Hero Text */}
          <div>
            <div className="w-[40vw] flex flex-col gap-5">
              <h1 className="text-7xl font-fontChillOne">
                Are You Just A Chill Guy?
              </h1>
              <p className="font-fontChillTwo text-2xl font-semibold text-[#ab8261]">
                <span>How Chill Are You?</span> Let’s Measure Your Chillness with the help of Chill O Meter!
              </p>
            </div>

            {/* Button */}
            <a
              href="#input"
              className="font-fontChillTwo text-xl text-blue-500 font-semibold underline"
            >
              Click Here <span className="font-fontChillOne">!</span>
            </a>
          </div>

          {/* Hero Img */}
          <div>
            <img src={chillGuy} alt="chillguy" className="size-96 rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="h-[70vh] flex justify-center items-center">
        <div className="flex items-center gap-5">
          <input
            id="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter username"
            className="border-black/70 focus:outline-none focus:border-2 focus:shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.15)] transition-all duration-300 focus:border-[#d8b69a] border-[1.55px] h-20 w-[40vw] p-5 text-xl font-fontChillTwo"
          />
          <button
            onClick={handleFetchData}
            className="font-fontChillOne h-20 w-40 hover:shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.15)] transition-all duration-200 border-4 rounded text-2xl text-center border-[#ab8261] bg-[#ffffff]"
          >
            Let's Chill
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default App;
