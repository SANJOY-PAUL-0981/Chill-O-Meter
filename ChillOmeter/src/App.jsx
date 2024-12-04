import { useState } from "react";
import "./App.css";
import chillGuy from "../src/assets/chillGuy.jpg";
import NavBar from "./ui/NavBar";
import Footer from "./ui/Footer";
import { fetchUserID } from "./fetchUserID";
import { fetchTweets } from "./fetchTweets";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

function App() {
  const [username, setUsername] = useState("");
  const [chillScore, setChillScore] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI("AIzaSyAjwyYdd5cqrB9QxaXIAdIT1bE_GFC5q68");

  const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  ];

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySettings,
  });

  const handleFetchData = async () => {
    if (!username) {
      alert("Please enter a username!");
      return;
    }

    setLoading(true);

    try {
      const userId = await fetchUserID(username);
      const tweetsText = await fetchTweets(userId);

      const prompt = `
        Rate the user's Chill nature and tell the percentage of their chill, based on their tweets and generate a small 2 line chill but harsh roast on that person's chillness.
        Rules:
        1. DO NOT EXPLAIN ANYTHING; ONLY TELL THE VALUE.
        2. NO NEED TO EXPLAIN THE REASONS BEHIND VALUE.
        3. JUST ONLY GENERATE THE VALUE.
        4. GENERATE THE ANSWER BEING 200% SURE OF THE PERCENTAGE VALUE.
        5. THE ANSWER WILL BE IN THIS FORMAT "You Are {RESULT}% chill." then in next line {ROAST} .
        6. THE CHILL RATE CAN BE ANY NUMBER BETWEEN 0-100.
        Here are the Tweets: ${tweetsText}
      `;

      const result = await model.generateContent(prompt);
      const generatedText = await result.response.text();
      setChillScore(generatedText);
    } catch (error) {
      console.error("Detailed Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center h-[90vh] mb-20 md:mb-10">
        <div className="border-2 border-amber-800/20 w-[90vw] md:w-[80vw] xl:h-[80vh] h-[100vh] md:h-auto rounded-3xl flex flex-col md:flex-row justify-between items-center xl:p-8 p-8 xl:px-10 md:p-14 xl:gap-20 shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.45)]">

          <div>
            <div className="flex flex-col gap-5 text-center md:text-left">
              <h1 className="text-5xl md:text-7xl font-fontChillOne">Are You Just A Chill Guy?</h1>
              <p className="font-fontChillTwo text-lg md:text-2xl font-semibold text-[#ab8261]">
                <span>How Chill Are You?</span> Let’s Measure Your Chillness with the help of Chill O Meter!
              </p>
            </div>
            <a
              href="#input"
              className="font-fontChillTwo text-md md:text-xl text-blue-500 font-semibold underline"
            >
              Click Here <span className="font-fontChillOne">!</span>
            </a>
          </div>

          <div className="xl:w-[35vw]">
            <img src={chillGuy} alt="chillguy" className="xl:size-96 size-80 rounded-3xl" />
          </div>

        </div>
      </div>

      <div className="h-auto md:h-[40vh] flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col md:flex-row items-center gap-5">
          <input
            id="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Twitter username"
            className="border-black/70 focus:outline-none focus:border-2 focus:shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.15)] transition-all duration-300 focus:border-[#d8b69a] border-[1.55px] h-16 md:h-20 w-[90vw] md:w-[40vw] p-5 text-lg md:text-xl font-fontChillTwo"
          />
          <button
            onClick={handleFetchData}
            className="font-fontChillOne h-16 md:h-20 w-[30vw] md:w-40 hover:shadow-[-10px_-10px_30px_4px_rgba(171,130,97,0.1),_10px_10px_30px_4px_rgba(171,130,97,0.15)] transition-all duration-200 border-4 rounded text-lg md:text-2xl text-center border-[#ab8261] bg-[#ffffff]"
          >
            Let's Chill
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center p-10 flex justify-center items-center">
          <img src="../src/assets/loading.gif" alt="Loading..." className="loader w-20 md:w-40" />
        </div>
      ) : (
        chillScore && (
          <div className="text-center text-sm md:text-lg p-10 flex justify-center items-center">
            <div className="w-[90vw] md:w-[45vw]">
              <h2 className="text-2xl md:text-3xl font-fontChillOne">{chillScore}</h2>
            </div>
          </div>
        )
      )}

      <Footer />
    </>
  );
}

export default App;
