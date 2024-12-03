import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Generate a chill joke";

const result = await model.generateContent(prompt);
console.log(result.response.text());